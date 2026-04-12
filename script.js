const allLocations = [
    { lat: 45.4215, lng: -75.6972, name: "Канада", iso: "CAN" },
    { lat: 19.4326, lng: -99.1332, name: "Мексика", iso: "MEX" },
    { lat: 38.9072, lng: -77.0369, name: "США", iso: "USA" },
    { lat: 14.6349, lng: -90.5069, name: "Гватемала", iso: "GTM" },
    { lat: 14.0818, lng: -87.2068, name: "Гондурас", iso: "HND" },
    { lat: 12.1150, lng: -86.2362, name: "Никарагуа", iso: "NIC" },
    { lat: 9.9281, lng: -84.0907, name: "Коста-Рика", iso: "CRI" },
    { lat: 8.9824, lng: -79.5199, name: "Панама", iso: "PAN" },
    { lat: 18.5001, lng: -69.9885, name: "Доминикана", iso: "DOM" },
    { lat: 23.1136, lng: -82.3666, name: "Куба", iso: "CUB" },
    { lat: -34.6037, lng: -58.3816, name: "Аргентина", iso: "ARG" },
    { lat: -16.4897, lng: -68.1193, name: "Боливия", iso: "BOL" },
    { lat: -15.7975, lng: -47.8919, name: "Бразилия", iso: "BRA" },
    { lat: -33.4489, lng: -70.6693, name: "Чили", iso: "CHL" },
    { lat: 4.7110, lng: -74.0721, name: "Колумбия", iso: "COL" },
    { lat: -12.0464, lng: -77.0428, name: "Перу", iso: "PER" },
    { lat: 52.5200, lng: 13.4050, name: "Германия", iso: "DEU" },
    { lat: 48.8566, lng: 2.3522, name: "Франция", iso: "FRA" },
    { lat: 41.9028, lng: 12.4964, name: "Италия", iso: "ITA" },
    { lat: 35.6762, lng: 139.6503, name: "Япония", iso: "JPN" },
    { lat: 55.7558, lng: 37.6173, name: "Россия", iso: "RUS" },
    { lat: -33.9249, lng: 18.4241, name: "ЮАР", iso: "ZAF" },
    { lat: 30.0444, lng: 31.2357, name: "Египет", iso: "EGY" },
    { lat: -35.2809, lng: 149.1300, name: "Австралия", iso: "AUS" }
];

const ROUNDS_TOTAL = 10;
let gameLocations = []; 

const urlParams = new URLSearchParams(window.location.search);
let hostIdFromUrl = urlParams.get('host');
const peer = new Peer();

let isHost = !hostIdFromUrl;
let players = []; 
let myConn = null; 
let myPlayerIndex = -1; 

let map;
let currentRound = 0;
let scores = [0, 0];
let playerNames = ["Ожидание...", "Ожидание..."];
let zoomInterval = null;
let currentZoom = 18;

// ГРАНИЦЫ
let worldGeoJSON = null;
let countryBorderLayer = null;

// Загрузка GeoJSON с проверкой
fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
    .then(res => res.json())
    .then(data => {
        worldGeoJSON = data;
        console.log("Границы загружены!");
        if (isHost) document.getElementById('lobby-status').innerText = "Ожидание игроков...";
    })
    .catch(err => alert("Ошибка загрузки границ. Перезагрузите страницу."));

peer.on('open', (id) => {
    document.getElementById('setup-role-text').innerText = isHost ? "ТЫ - ВЕДУЩИЙ (СУДЬЯ)" : "ТЫ - ИГРОК";
    if (isHost) {
        document.getElementById('host-panel').style.display = 'block';
        document.getElementById('nick-input').style.display = 'none'; 
        const gameUrl = window.location.origin + window.location.pathname + '?host=' + id;
        document.getElementById('game-url-box').innerText = gameUrl;
        document.getElementById('btn-copy').onclick = () => {
            navigator.clipboard.writeText(gameUrl);
            document.getElementById('btn-copy').innerText = "ССЫЛКА В БУФЕРЕ!";
        };
        document.getElementById('btn-start').onclick = startRoundAsHost;
    } else {
        document.getElementById('guest-panel').style.display = 'block';
        document.getElementById('btn-join').onclick = () => {
            const nick = document.getElementById('nick-input').value || "Аноним";
            document.getElementById('setup-overlay').style.display = 'none';
            document.getElementById('main-game-container').style.display = 'flex';
            document.getElementById('player-controls').style.display = 'block';
            initMap();
            myConn = peer.connect(hostIdFromUrl);
            setupPlayerConnection(myConn, nick);
        };
    }
});

if (isHost) {
    peer.on('connection', (conn) => {
        const playerIndex = players.length;
        players.push(conn);
        conn.on('data', (data) => {
            if (data.type === 'join') {
                playerNames[playerIndex] = data.name;
                document.getElementById('lobby-status').innerText = `Ждем игроков (${players.length}/2)...`;
                if (players.length === 2) {
                    document.getElementById('lobby-status').innerText = "Все готовы!";
                    document.getElementById('btn-start').disabled = false;
                    document.getElementById('name-p1').innerText = playerNames[0];
                    document.getElementById('name-p2').innerText = playerNames[1];
                    broadcast({ type: 'names', names: playerNames });
                }
            }
            if (data.type === 'buzz') handleBuzz(playerIndex);
        });
    });
}

function startRoundAsHost() {
    if (currentRound === 0) {
        const shuffled = [...allLocations].sort(() => 0.5 - Math.random());
        gameLocations = shuffled.slice(0, ROUNDS_TOTAL);
    }
    document.getElementById('setup-overlay').style.display = 'none';
    document.getElementById('main-game-container').style.display = 'flex';
    document.getElementById('host-controls').style.display = 'none';
    if(!map) initMap();
    
    currentZoom = 18;
    const loc = gameLocations[currentRound];
    
    broadcast({ type: 'start_round', lat: loc.lat, lng: loc.lng, zoom: currentZoom, roundNum: currentRound+1, iso: loc.iso });
    
    map.setView([loc.lat, loc.lng], currentZoom);
    updateBorder(loc.iso, currentZoom);

    clearInterval(zoomInterval);
    zoomInterval = setInterval(() => {
        currentZoom--;
        map.setZoom(currentZoom);
        updateBorder(loc.iso, currentZoom);
        broadcast({ type: 'zoom', zoom: currentZoom, iso: loc.iso });
        if (currentZoom <= 3) clearInterval(zoomInterval);
    }, 5000);
}

function handleBuzz(playerIndex) {
    clearInterval(zoomInterval);
    broadcast({ type: 'buzzed', playerIndex: playerIndex });
    document.getElementById('map-overlay').style.display = 'flex';
    document.getElementById('host-controls').style.display = 'flex';
    document.getElementById('answering-player-name').innerText = playerNames[playerIndex];
    document.getElementById('correct-answer-host').innerText = gameLocations[currentRound].name;
    window.activeBuzzer = playerIndex;
}

window.judgeAnswer = function(isCorrect) {
    document.getElementById('host-controls').style.display = 'none';
    if (isCorrect) {
        scores[window.activeBuzzer] += 100;
        broadcast({ type: 'scores', scores: scores });
        endRoundHost();
    } else {
        scores[window.activeBuzzer] -= 100;
        broadcast({ type: 'scores', scores: scores });
        resumeRoundHost();
    }
}

function resumeRoundHost() {
    document.getElementById('map-overlay').style.display = 'none';
    const loc = gameLocations[currentRound];
    zoomInterval = setInterval(() => {
        currentZoom--;
        map.setZoom(currentZoom);
        updateBorder(loc.iso, currentZoom);
        broadcast({ type: 'zoom', zoom: currentZoom, iso: loc.iso });
        if (currentZoom <= 3) clearInterval(zoomInterval);
    }, 5000);
    broadcast({ type: 'resume' });
}

function endRoundHost() {
    clearInterval(zoomInterval);
    broadcast({ type: 'round_end' });
    if(countryBorderLayer) countryBorderLayer.setStyle({ opacity: 1, fillOpacity: 0.4 });
    
    setTimeout(() => {
        if(countryBorderLayer) map.removeLayer(countryBorderLayer);
        countryBorderLayer = null;
        currentRound++;
        if (currentRound < ROUNDS_TOTAL) startRoundAsHost();
        else { alert("Игра окончена!"); location.reload(); }
    }, 4000);
}

function broadcast(data) { players.forEach(p => p.send(data)); }

// ЛОГИКА ИГРОКА
function setupPlayerConnection(conn, nick) {
    conn.on('open', () => conn.send({ type: 'join', name: nick }));
    conn.on('data', (data) => {
        if (data.type === 'names') {
            playerNames = data.names;
            document.getElementById('name-p1').innerText = playerNames[0];
            document.getElementById('name-p2').innerText = playerNames[1];
            myPlayerIndex = playerNames[0] === nick ? 0 : 1;
        }
        if (data.type === 'start_round') {
            if(countryBorderLayer) map.removeLayer(countryBorderLayer);
            countryBorderLayer = null;
            document.getElementById('map-overlay').style.display = 'none';
            document.getElementById('btn-buzz').disabled = false;
            map.setView([data.lat, data.lng], data.zoom);
            updateBorder(data.iso, data.zoom);
        }
        if (data.type === 'zoom') {
            map.setZoom(data.zoom);
            updateBorder(data.iso, data.zoom);
        }
        if (data.type === 'buzzed') {
            document.getElementById('btn-buzz').disabled = true;
            document.getElementById('map-overlay').style.display = 'flex';
        }
        if (data.type === 'resume') {
            document.getElementById('map-overlay').style.display = 'none';
            document.getElementById('btn-buzz').disabled = false;
        }
        if (data.type === 'scores') {
            document.getElementById('score-p1').innerText = data.scores[0];
            document.getElementById('score-p2').innerText = data.scores[1];
        }
        if (data.type === 'round_end') {
            if(countryBorderLayer) countryBorderLayer.setStyle({ opacity: 1, fillOpacity: 0.4 });
        }
    });
}

window.sendBuzz = function() { if(myConn) myConn.send({ type: 'buzz' }); };

function updateBorder(iso, zoom) {
    if (!worldGeoJSON) return;

    // Настройка видимости: начинает появляться на зуме 13, на 4 - максимум
    let alpha = Math.max(0, Math.min(1, (13 - zoom) / 8));

    if (!countryBorderLayer) {
        // Ищем в GeoJSON по разным вариантам ID (ISO_A3 или ISO)
        const feature = worldGeoJSON.features.find(f => 
            f.properties.ISO_A3 === iso || f.properties.ISO === iso || f.properties.ADMIN === iso
        );
        if (feature) {
            countryBorderLayer = L.geoJSON(feature, {
                style: { color: '#ff3333', weight: 4, opacity: 0, fillColor: '#ff3333', fillOpacity: 0 }
            }).addTo(map);
        }
    }

    if (countryBorderLayer) {
        countryBorderLayer.setStyle({
            opacity: alpha,
            fillOpacity: alpha * 0.2
        });
    }
}

function initMap() {
    map = L.map('map', { zoomControl: false, dragging: false, scrollWheelZoom: false });
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(map);
}
