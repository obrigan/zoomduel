// ОГРОМНАЯ БАЗА ЛОКАЦИЙ С ISO КОДАМИ СТРАН
const allLocations = [
    // СЕВЕРНАЯ АМЕРИКА
    { lat: 45.4215, lng: -75.6972, name: "Канада", iso: "CAN" },
    { lat: 19.4326, lng: -99.1332, name: "Мексика", iso: "MEX" },
    { lat: 38.9072, lng: -77.0369, name: "США", iso: "USA" },
    { lat: 14.6349, lng: -90.5069, name: "Гватемала", iso: "GTM" },
    { lat: 12.1150, lng: -86.2362, name: "Никарагуа", iso: "NIC" },
    { lat: 9.9281, lng: -84.0907, name: "Коста-Рика", iso: "CRI" },
    { lat: 8.9824, lng: -79.5199, name: "Панама", iso: "PAN" },
    { lat: 18.5001, lng: -69.9885, name: "Доминикана", iso: "DOM" },
    { lat: 23.1136, lng: -82.3666, name: "Куба", iso: "CUB" },
    // ЮЖНАЯ АМЕРИКА
    { lat: -34.6037, lng: -58.3816, name: "Аргентина", iso: "ARG" },
    { lat: -16.4897, lng: -68.1193, name: "Боливия", iso: "BOL" },
    { lat: -15.7975, lng: -47.8919, name: "Бразилия", iso: "BRA" },
    { lat: -33.4489, lng: -70.6693, name: "Чили", iso: "CHL" },
    { lat: 4.7110, lng: -74.0721, name: "Колумбия", iso: "COL" },
    { lat: -0.1807, lng: -78.4678, name: "Эквадор", iso: "ECU" },
    { lat: -25.2637, lng: -57.5759, name: "Парагвай", iso: "PRY" },
    { lat: -12.0464, lng: -77.0428, name: "Перу", iso: "PER" },
    { lat: -34.9011, lng: -56.1645, name: "Уругвай", iso: "URY" },
    { lat: 10.4806, lng: -66.9036, name: "Венесуэла", iso: "VEN" },
    // ЕВРОПА
    { lat: 48.2082, lng: 16.3738, name: "Австрия", iso: "AUT" },
    { lat: 50.8503, lng: 4.3517, name: "Бельгия", iso: "BEL" },
    { lat: 42.6977, lng: 23.3219, name: "Болгария", iso: "BGR" },
    { lat: 50.0755, lng: 14.4378, name: "Чехия", iso: "CZE" },
    { lat: 55.6761, lng: 12.5683, name: "Дания", iso: "DNK" },
    { lat: 59.4370, lng: 24.7535, name: "Эстония", iso: "EST" },
    { lat: 60.1699, lng: 24.9384, name: "Финляндия", iso: "FIN" },
    { lat: 48.8566, lng: 2.3522, name: "Франция", iso: "FRA" },
    { lat: 52.5200, lng: 13.4050, name: "Германия", iso: "DEU" },
    { lat: 37.9838, lng: 23.7275, name: "Греция", iso: "GRC" },
    { lat: 47.4979, lng: 19.0402, name: "Венгрия", iso: "HUN" },
    { lat: 53.3498, lng: -6.2603, name: "Ирландия", iso: "IRL" },
    { lat: 41.9028, lng: 12.4964, name: "Италия", iso: "ITA" },
    { lat: 56.9496, lng: 24.1052, name: "Латвия", iso: "LVA" },
    { lat: 54.6872, lng: 25.2797, name: "Литва", iso: "LTU" },
    { lat: 52.3676, lng: 4.9041, name: "Нидерланды", iso: "NLD" },
    { lat: 59.9139, lng: 10.7522, name: "Норвегия", iso: "NOR" },
    { lat: 52.2297, lng: 21.0122, name: "Польша", iso: "POL" },
    { lat: 38.7223, lng: -9.1393, name: "Португалия", iso: "PRT" },
    { lat: 44.4268, lng: 26.1025, name: "Румыния", iso: "ROU" },
    { lat: 55.7558, lng: 37.6173, name: "Россия", iso: "RUS" },
    { lat: 44.7866, lng: 20.4489, name: "Сербия", iso: "SRB" },
    { lat: 40.4168, lng: -3.7038, name: "Испания", iso: "ESP" },
    { lat: 59.3293, lng: 18.0686, name: "Швеция", iso: "SWE" },
    { lat: 46.8182, lng: 8.2275, name: "Швейцария", iso: "CHE" },
    { lat: 50.4501, lng: 30.5234, name: "Украина", iso: "UKR" },
    { lat: 51.5074, lng: -0.1278, name: "Великобритания", iso: "GBR" },
    // АЗИЯ
    { lat: 40.4093, lng: 49.8671, name: "Азербайджан", iso: "AZE" },
    { lat: 23.8103, lng: 90.4125, name: "Бангладеш", iso: "BGD" },
    { lat: 39.9042, lng: 116.4074, name: "Китай", iso: "CHN" },
    { lat: 28.6139, lng: 77.2090, name: "Индия", iso: "IND" },
    { lat: -6.2088, lng: 106.8456, name: "Индонезия", iso: "IDN" },
    { lat: 33.3152, lng: 44.3661, name: "Ирак", iso: "IRQ" },
    { lat: 35.6892, lng: 51.3890, name: "Иран", iso: "IRN" },
    { lat: 35.6762, lng: 139.6503, name: "Япония", iso: "JPN" },
    { lat: 51.1694, lng: 71.4491, name: "Казахстан", iso: "KAZ" },
    { lat: 3.1390, lng: 101.6869, name: "Малайзия", iso: "MYS" },
    { lat: 19.7533, lng: 96.0785, name: "Мьянма", iso: "MMR" },
    { lat: 33.6844, lng: 73.0479, name: "Пакистан", iso: "PAK" },
    { lat: 14.5995, lng: 120.9842, name: "Филиппины", iso: "PHL" },
    { lat: 24.7136, lng: 46.6753, name: "Саудовская Аравия", iso: "SAU" },
    { lat: 37.5665, lng: 126.9780, name: "Южная Корея", iso: "KOR" },
    { lat: 13.7563, lng: 100.5018, name: "Таиланд", iso: "THA" },
    { lat: 39.9208, lng: 32.8541, name: "Турция", iso: "TUR" },
    { lat: 41.2995, lng: 69.2401, name: "Узбекистан", iso: "UZB" },
    { lat: 21.0285, lng: 105.8542, name: "Вьетнам", iso: "VNM" },
    // АФРИКА
    { lat: 36.7538, lng: 3.0588, name: "Алжир", iso: "DZA" },
    { lat: -8.8390, lng: 13.2894, name: "Ангола", iso: "AGO" },
    { lat: 4.0511, lng: 9.7679, name: "Камерун", iso: "CMR" },
    { lat: 30.0444, lng: 31.2357, name: "Египет", iso: "EGY" },
    { lat: 9.0300, lng: 38.7400, name: "Эфиопия", iso: "ETH" },
    { lat: 5.6037, lng: -0.1870, name: "Гана", iso: "GHA" },
    { lat: 5.3600, lng: -4.0083, name: "Кот-д'Ивуар", iso: "CIV" },
    { lat: -1.2921, lng: 36.8219, name: "Кения", iso: "KEN" },
    { lat: 34.0209, lng: -6.8416, name: "Марокко", iso: "MAR" },
    { lat: 9.0820, lng: 8.6753, name: "Нигерия", iso: "NGA" },
    { lat: -33.9249, lng: 18.4241, name: "ЮАР", iso: "ZAF" },
    { lat: -6.7924, lng: 39.2083, name: "Танзания", iso: "TZA" },
    // ОКЕАНИЯ
    { lat: -35.2809, lng: 149.1300, name: "Австралия", iso: "AUS" },
    { lat: -41.2865, lng: 174.7762, name: "Новая Зеландия", iso: "NZL" },
    { lat: -9.4431, lng: 147.1803, name: "Папуа — Новая Гвинея", iso: "PNG" }
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
let bordersLoaded = false; 

// Загрузка GeoJSON с надежного CDN
fetch('https://cdn.jsdelivr.net/gh/johan/world.geo.json@master/countries.geo.json')
    .then(res => res.json())
    .then(data => {
        worldGeoJSON = data;
        bordersLoaded = true;
        console.log("Границы стран загружены!");
        if (isHost) {
            document.getElementById('lobby-status').innerText = "Ожидание игроков (0/2)...";
            document.getElementById('lobby-status').style.color = "#f1c40f";
        }
    })
    .catch(err => {
        alert("ОШИБКА ЗАГРУЗКИ ГРАНИЦ. Попробуйте перезагрузить страницу.");
        console.log("Ошибка загрузки:", err);
    });

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
                    if (bordersLoaded) {
                        document.getElementById('lobby-status').innerText = "Все готовы!";
                        document.getElementById('lobby-status').style.color = "#2ecc71";
                        document.getElementById('btn-start').disabled = false;
                    } else {
                        document.getElementById('lobby-status').innerText = "Игроки готовы, ждем загрузки границ...";
                    }
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

function updateHostScoresUI() {
    document.getElementById('score-p1').innerText = scores[0];
    document.getElementById('score-p2').innerText = scores[1];
}

window.judgeAnswer = function(isCorrect) {
    document.getElementById('host-controls').style.display = 'none';
    if (isCorrect) {
        scores[window.activeBuzzer] += 100;
        updateHostScoresUI(); 
        broadcast({ type: 'scores', scores: scores });
        endRoundHost();
    } else {
        scores[window.activeBuzzer] -= 100;
        updateHostScoresUI(); 
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
    if(countryBorderLayer) {
        countryBorderLayer.setStyle({ opacity: 1, fillOpacity: 0.25 });
    }
    
    setTimeout(() => {
        if(countryBorderLayer) map.removeLayer(countryBorderLayer);
        countryBorderLayer = null;
        currentRound++;
        if (currentRound < ROUNDS_TOTAL) startRoundAsHost();
        else { alert("Игра окончена!"); location.reload(); }
    }, 4000);
}

function broadcast(data) { players.forEach(p => p.send(data)); }

// === ЛОГИКА ИГРОКОВ (КЛИЕНТОВ) ===
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
            
            if(!bordersLoaded) {
                document.getElementById('status-text').innerText = "ГРАНИЦЫ ЗАГРУЖАЮТСЯ... ЖДИТЕ!";
                document.getElementById('status-text').style.color = "#f1c40f";
            } else {
                document.getElementById('status-text').innerText = `Раунд ${data.roundNum} из ${ROUNDS_TOTAL}`;
                document.getElementById('status-text').style.color = "#fff";
            }
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
            document.getElementById('map-overlay').style.display = 'none';
            document.getElementById('btn-buzz').disabled = true;
            document.getElementById('status-text').innerText = "Раунд завершен!";
            document.getElementById('status-text').style.color = "#aaa";
            if(countryBorderLayer) {
                countryBorderLayer.setStyle({ opacity: 1, fillOpacity: 0.25 });
            }
        }
    });
}

window.sendBuzz = function() { if(myConn) myConn.send({ type: 'buzz' }); };

// === ИСПРАВЛЕННАЯ ФУНКЦИЯ ОТРИСОВКИ ===
function updateBorder(iso, zoom) {
    if (!worldGeoJSON || !bordersLoaded) return;

    // Граница начинает появляться с зума 15. На зуме 5 она полностью непрозрачна (1.0).
    let alpha = Math.max(0, Math.min(1, (15 - zoom) / 10));

    if (!countryBorderLayer) {
        // В новой базе идентификатором страны является feature.id
        const feature = worldGeoJSON.features.find(f => f.id === iso);
        
        if (feature) {
            countryBorderLayer = L.geoJSON(feature, {
                style: {
                    color: '#ff0000', // Ярко-красный
                    weight: 5,        // Толстая линия
                    opacity: alpha,
                    fillColor: '#ff0000',
                    fillOpacity: alpha * 0.15 // Легкая заливка
                }
            }).addTo(map);
            // Заставляем слой отрисоваться поверх карты
            countryBorderLayer.bringToFront();
        } else {
            console.error("Не найден ISO код в базе: " + iso);
        }
    } else {
        countryBorderLayer.setStyle({
            opacity: alpha,
            fillOpacity: alpha * 0.15
        });
    }
}

function initMap() {
    map = L.map('map', {
        zoomControl: false, dragging: false, scrollWheelZoom: false,
        doubleClickZoom: false, boxZoom: false, keyboard: false
    });
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri'
    }).addTo(map);
}
