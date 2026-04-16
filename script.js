const allLocations = [
    { lat: 45.4215, lng: -75.6972, name: "Канада", iso: "CAN" },
    { lat: 19.4326, lng: -99.1332, name: "Мексика", iso: "MEX" },
    { lat: 38.9072, lng: -77.0369, name: "США", iso: "USA" },
    { lat: 14.6349, lng: -90.5069, name: "Гватемала", iso: "GTM" },
    { lat: 12.1150, lng: -86.2362, name: "Никарагуа", iso: "NIC" },
    { lat: 9.9281, lng: -84.0907, name: "Коста-Рика", iso: "CRI" },
    { lat: 8.9824, lng: -79.5199, name: "Панама", iso: "PAN" },
    { lat: -34.6037, lng: -58.3816, name: "Аргентина", iso: "ARG" },
    { lat: -23.5505, lng: -46.6333, name: "Бразилия", iso: "BRA" },
    { lat: -33.4489, lng: -70.6693, name: "Чили", iso: "CHL" },
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
let map, currentRound = 0, scores = [0, 0], playerNames = ["Ожидание...", "Ожидание..."], zoomInterval = null, currentZoom = 18;
let worldGeoJSON = null, countryBorderLayer = null, bordersLoaded = false;

fetch('https://cdn.jsdelivr.net/gh/johan/world.geo.json@master/countries.geo.json')
    .then(res => res.json())
    .then(data => { worldGeoJSON = data; bordersLoaded = true; if (isHost) document.getElementById('lobby-status').innerText = "Ожидание игроков (0/2)..."; });

peer.on('open', (id) => {
    document.getElementById('setup-role-text').innerText = isHost ? "ТЫ - ВЕДУЩИЙ (СУДЬЯ)" : "ТЫ - ИГРОК";
    if (isHost) {
        document.getElementById('host-panel').style.display = 'block';
        document.getElementById('nick-input').style.display = 'none'; 
        document.getElementById('game-url-box').innerText = window.location.origin + window.location.pathname + '?host=' + id;
        document.getElementById('btn-copy').onclick = () => { navigator.clipboard.writeText(document.getElementById('game-url-box').innerText); document.getElementById('btn-copy').innerText = "ССЫЛКА В БУФЕРЕ!"; };
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
        const pIdx = players.length;
        players.push(conn);
        conn.on('data', (data) => {
            if (data.type === 'join') {
                playerNames[pIdx] = data.name;
                if (players.length === 2) {
                    document.getElementById('btn-start').disabled = !bordersLoaded;
                    document.getElementById('lobby-status').innerText = "Все готовы!";
                    document.getElementById('name-p1').innerText = playerNames[0];
                    document.getElementById('name-p2').innerText = playerNames[1];
                    broadcast({ type: 'names', names: playerNames });
                }
            }
            if (data.type === 'buzz') handleBuzz(pIdx);
        });
    });
}

function startRoundAsHost() {
    if (currentRound === 0) gameLocations = [...allLocations].sort(() => 0.5 - Math.random()).slice(0, ROUNDS_TOTAL);
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

function handleBuzz(pIdx) {
    clearInterval(zoomInterval);
    broadcast({ type: 'buzzed', pIdx: pIdx });
    document.getElementById('map-overlay').style.display = 'flex';
    document.getElementById('host-controls').style.display = 'flex';
    document.getElementById('answering-player-name').innerText = playerNames[pIdx];
    document.getElementById('correct-answer-host').innerText = gameLocations[currentRound].name;
    window.activeBuzzer = pIdx;
}

window.judgeAnswer = function(isCorrect) {
    document.getElementById('host-controls').style.display = 'none';
    scores[window.activeBuzzer] += isCorrect ? 100 : -100;
    broadcast({ type: 'scores', scores: scores });
    document.getElementById('score-p1').innerText = scores[0];
    document.getElementById('score-p2').innerText = scores[1];
    if (isCorrect) endRoundHost(); else resumeRoundHost();
}

function resumeRoundHost() {
    document.getElementById('map-overlay').style.display = 'none';
    zoomInterval = setInterval(() => {
        currentZoom--;
        map.setZoom(currentZoom);
        updateBorder(gameLocations[currentRound].iso, currentZoom);
        broadcast({ type: 'zoom', zoom: currentZoom, iso: gameLocations[currentRound].iso });
        if (currentZoom <= 3) clearInterval(zoomInterval);
    }, 5000);
    broadcast({ type: 'resume' });
}

function endRoundHost() {
    clearInterval(zoomInterval);
    broadcast({ type: 'round_end' });
    if(countryBorderLayer) countryBorderLayer.setStyle({ opacity: 1, fillOpacity: 0.25 });
    setTimeout(() => {
        if(countryBorderLayer) map.removeLayer(countryBorderLayer);
        countryBorderLayer = null;
        currentRound++;
        if (currentRound < ROUNDS_TOTAL) startRoundAsHost();
        else { alert("Игра окончена!"); location.reload(); }
    }, 4000);
}

function broadcast(d) { players.forEach(p => p.send(d)); }

function setupPlayerConnection(conn, nick) {
    conn.on('open', () => conn.send({ type: 'join', name: nick }));
    conn.on('data', (d) => {
        if (d.type === 'names') {
            playerNames = d.names;
            document.getElementById('name-p1').innerText = playerNames[0];
            document.getElementById('name-p2').innerText = playerNames[1];
            myPlayerIndex = playerNames[0] === nick ? 0 : 1;
        }
        if (d.type === 'start_round') {
            if(countryBorderLayer) map.removeLayer(countryBorderLayer);
            countryBorderLayer = null;
            document.getElementById('map-overlay').style.display = 'none';
            document.getElementById('btn-buzz').disabled = false;
            map.setView([d.lat, d.lng], d.zoom);
            updateBorder(d.iso, d.zoom);
            document.getElementById('status-text').innerText = `Раунд ${d.roundNum} из ${ROUNDS_TOTAL}`;
        }
        if (d.type === 'zoom') { map.setZoom(d.zoom); updateBorder(d.iso, d.zoom); }
        if (d.type === 'buzzed') { document.getElementById('btn-buzz').disabled = true; document.getElementById('map-overlay').style.display = 'flex'; }
        if (d.type === 'resume') { document.getElementById('map-overlay').style.display = 'none'; document.getElementById('btn-buzz').disabled = false; }
        if (d.type === 'scores') { document.getElementById('score-p1').innerText = d.scores[0]; document.getElementById('score-p2').innerText = d.scores[1]; }
        if (d.type === 'round_end') if(countryBorderLayer) countryBorderLayer.setStyle({ opacity: 1, fillOpacity: 0.25 });
    });
}

window.sendBuzz = function() { if(myConn) myConn.send({ type: 'buzz' }); };

function updateBorder(iso, zoom) {
    if (!worldGeoJSON || !bordersLoaded) return;
    let alpha = Math.max(0, Math.min(1, (15 - zoom) / 10));
    if (!countryBorderLayer) {
        const feat = worldGeoJSON.features.find(f => f.id === iso || f.properties.ISO_A3 === iso);
        if (feat) {
            countryBorderLayer = L.geoJSON(feat, {
                style: { color: '#ff0000', weight: 5, opacity: alpha, fillColor: '#ff0000', fillOpacity: alpha * 0.15 }
            }).addTo(map);
        }
    } else {
        countryBorderLayer.setStyle({ opacity: alpha, fillOpacity: alpha * 0.15 });
    }
}

function initMap() {
    map = L.map('map', { zoomControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false, boxZoom: false, keyboard: false });
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(map);
}
