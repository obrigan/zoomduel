// РАСШИРЕННАЯ БАЗА: Больше стран, меньше повторов внутри одной страны
const allLocations = [
    // СЕВЕРНАЯ АМЕРИКА
    { lat: 45.4215, lng: -75.6972, name: "Канада (Оттава)" },
    { lat: 19.4326, lng: -99.1332, name: "Мексика (Мехико)" },
    { lat: 38.9072, lng: -77.0369, name: "США (Вашингтон)" },
    { lat: 14.6349, lng: -90.5069, name: "Гватемала" },
    { lat: 14.0818, lng: -87.2068, name: "Гондурас" },
    { lat: 12.1150, lng: -86.2362, name: "Никарагуа" },
    { lat: 9.9281, lng: -84.0907, name: "Коста-Рика" },
    { lat: 8.9824, lng: -79.5199, name: "Панама" },
    { lat: 18.5001, lng: -69.9885, name: "Доминикана" },
    { lat: 23.1136, lng: -82.3666, name: "Куба" },

    // ЮЖНАЯ АМЕРИКА
    { lat: -34.6037, lng: -58.3816, name: "Аргентина" },
    { lat: -16.4897, lng: -68.1193, name: "Боливия" },
    { lat: -15.7975, lng: -47.8919, name: "Бразилия" },
    { lat: -33.4489, lng: -70.6693, name: "Чили" },
    { lat: 4.7110, lng: -74.0721, name: "Колумбия" },
    { lat: -0.1807, lng: -78.4678, name: "Эквадор" },
    { lat: -25.2637, lng: -57.5759, name: "Парагвай" },
    { lat: -12.0464, lng: -77.0428, name: "Перу" },
    { lat: -34.9011, lng: -56.1645, name: "Уругвай" },
    { lat: 10.4806, lng: -66.9036, name: "Венесуэла" },

    // ЕВРОПА
    { lat: 48.2082, lng: 16.3738, name: "Австрия" },
    { lat: 50.8503, lng: 4.3517, name: "Бельгия" },
    { lat: 42.6977, lng: 23.3219, name: "Болгария" },
    { lat: 50.0755, lng: 14.4378, name: "Чехия" },
    { lat: 55.6761, lng: 12.5683, name: "Дания" },
    { lat: 59.4370, lng: 24.7535, name: "Эстония" },
    { lat: 60.1699, lng: 24.9384, name: "Финляндия" },
    { lat: 48.8566, lng: 2.3522, name: "Франция" },
    { lat: 52.5200, lng: 13.4050, name: "Германия" },
    { lat: 37.9838, lng: 23.7275, name: "Греция" },
    { lat: 47.4979, lng: 19.0402, name: "Венгрия" },
    { lat: 53.3498, lng: -6.2603, name: "Ирландия" },
    { lat: 41.9028, lng: 12.4964, name: "Италия" },
    { lat: 56.9496, lng: 24.1052, name: "Латвия" },
    { lat: 54.6872, lng: 25.2797, name: "Литва" },
    { lat: 52.3676, lng: 4.9041, name: "Нидерланды" },
    { lat: 59.9139, lng: 10.7522, name: "Норвегия" },
    { lat: 52.2297, lng: 21.0122, name: "Польша" },
    { lat: 38.7223, lng: -9.1393, name: "Португалия" },
    { lat: 44.4268, lng: 26.1025, name: "Румыния" },
    { lat: 55.7558, lng: 37.6173, name: "Россия" },
    { lat: 44.7866, lng: 20.4489, name: "Сербия" },
    { lat: 40.4168, lng: -3.7038, name: "Испания" },
    { lat: 59.3293, lng: 18.0686, name: "Швеция" },
    { lat: 46.8182, lng: 8.2275, name: "Швейцария" },
    { lat: 50.4501, lng: 30.5234, name: "Украина" },
    { lat: 51.5074, lng: -0.1278, name: "Великобритания" },

    // АЗИЯ
    { lat: 40.4093, lng: 49.8671, name: "Азербайджан" },
    { lat: 23.8103, lng: 90.4125, name: "Бангладеш" },
    { lat: 39.9042, lng: 116.4074, name: "Китай" },
    { lat: 28.6139, lng: 77.2090, name: "Индия" },
    { lat: -6.2088, lng: 106.8456, name: "Индонезия" },
    { lat: 33.3152, lng: 44.3661, name: "Ирак" },
    { lat: 35.6892, lng: 51.3890, name: "Иран" },
    { lat: 35.6762, lng: 139.6503, name: "Япония" },
    { lat: 51.1694, lng: 71.4491, name: "Казахстан" },
    { lat: 3.1390, lng: 101.6869, name: "Малайзия" },
    { lat: 19.7533, lng: 96.0785, name: "Мьянма" },
    { lat: 33.6844, lng: 73.0479, name: "Пакистан" },
    { lat: 14.5995, lng: 120.9842, name: "Филиппины" },
    { lat: 24.7136, lng: 46.6753, name: "Саудовская Аравия" },
    { lat: 37.5665, lng: 126.9780, name: "Южная Корея" },
    { lat: 13.7563, lng: 100.5018, name: "Таиланд" },
    { lat: 39.9208, lng: 32.8541, name: "Турция" },
    { lat: 41.2995, lng: 69.2401, name: "Узбекистан" },
    { lat: 21.0285, lng: 105.8542, name: "Вьетнам" },

    // АФРИКА (Развитые и крупные)
    { lat: 36.7538, lng: 3.0588, name: "Алжир" },
    { lat: -8.8390, lng: 13.2894, name: "Ангола" },
    { lat: 4.0511, lng: 9.7679, name: "Камерун" },
    { lat: 30.0444, lng: 31.2357, name: "Египет" },
    { lat: 9.0300, lng: 38.7400, name: "Эфиопия" },
    { lat: 5.6037, lng: -0.1870, name: "Гана" },
    { lat: 5.3600, lng: -4.0083, name: "Кот-д'Ивуар" },
    { lat: -1.2921, lng: 36.8219, name: "Кения" },
    { lat: 34.0209, lng: -6.8416, name: "Марокко" },
    { lat: 9.0820, lng: 8.6753, name: "Нигерия" },
    { lat: -33.9249, lng: 18.4241, name: "ЮАР" },
    { lat: -6.7924, lng: 39.2083, name: "Танзания" },

    // ОКЕАНИЯ
    { lat: -35.2809, lng: 149.1300, name: "Австралия" },
    { lat: -41.2865, lng: 174.7762, name: "Новая Зеландия" },
    { lat: -9.4431, lng: 147.1803, name: "Папуа — Новая Гвинея" }
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

// === ИНИЦИАЛИЗАЦИЯ ИНТЕРФЕЙСА ===
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

// === ЛОГИКА ВЕДУЩЕГО (СЕРВЕРА) ===
if (isHost) {
    peer.on('connection', (conn) => {
        if (players.length >= 2) { conn.close(); return; } 
        const playerIndex = players.length;
        players.push(conn);
        conn.on('data', (data) => {
            if (data.type === 'join') {
                playerNames[playerIndex] = data.name;
                document.getElementById('lobby-status').innerText = `Ждем игроков (${players.length}/2)...`;
                if (players.length === 2) {
                    document.getElementById('lobby-status').innerText = "Оба игрока готовы!";
                    document.getElementById('lobby-status').style.color = "#2ecc71";
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
    document.getElementById('status-text').innerText = `Раунд ${currentRound + 1} из ${ROUNDS_TOTAL}`;
    document.getElementById('status-text').style.color = "#fff";
    document.getElementById('map-overlay').style.display = 'none';
    broadcast({ type: 'start_round', lat: loc.lat, lng: loc.lng, zoom: currentZoom, roundNum: currentRound + 1, total: ROUNDS_TOTAL });
    map.setView([loc.lat, loc.lng], currentZoom);
    clearInterval(zoomInterval);
    zoomInterval = setInterval(() => {
        currentZoom--;
        map.setZoom(currentZoom);
        broadcast({ type: 'zoom', zoom: currentZoom });
        if (currentZoom <= 3) clearInterval(zoomInterval);
    }, 5000);
}

function handleBuzz(playerIndex) {
    clearInterval(zoomInterval); 
    broadcast({ type: 'buzzed', playerIndex: playerIndex });
    document.getElementById('map-overlay').style.display = 'flex';
    document.getElementById('overlay-text').innerText = `ОТВЕЧАЕТ ${playerNames[playerIndex].toUpperCase()}!`;
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
        resumeRoundHost(window.activeBuzzer);
    }
}

window.skipRound = function() {
    document.getElementById('host-controls').style.display = 'none';
    endRoundHost();
}

function resumeRoundHost(failedPlayerIndex) {
    document.getElementById('map-overlay').style.display = 'none';
    zoomInterval = setInterval(() => {
        currentZoom--;
        map.setZoom(currentZoom);
        broadcast({ type: 'zoom', zoom: currentZoom });
        if (currentZoom <= 3) clearInterval(zoomInterval);
    }, 5000);
    broadcast({ type: 'resume', failedPlayer: failedPlayerIndex });
}

function endRoundHost() {
    clearInterval(zoomInterval);
    broadcast({ type: 'round_end' });
    document.getElementById('status-text').innerText = `Правильный ответ: ${gameLocations[currentRound].name}`;
    document.getElementById('status-text').style.color = "#2ecc71";
    document.getElementById('map-overlay').style.display = 'none';
    setTimeout(() => {
        currentRound++;
        if (currentRound < ROUNDS_TOTAL) {
            startRoundAsHost();
        } else {
            alert(`ИГРА ОКОНЧЕНА!\n${playerNames[0]}: ${scores[0]}\n${playerNames[1]}: ${scores[1]}`);
            location.reload();
        }
    }, 4000);
}

function broadcast(data) {
    players.forEach(p => p.send(data));
}

// === ЛОГИКА ИГРОКОВ (КЛИЕНТОВ) ===
function setupPlayerConnection(conn, nick) {
    conn.on('open', () => {
        conn.send({ type: 'join', name: nick });
    });
    conn.on('data', (data) => {
        if (data.type === 'names') {
            playerNames = data.names;
            document.getElementById('name-p1').innerText = playerNames[0];
            document.getElementById('name-p2').innerText = playerNames[1];
            myPlayerIndex = playerNames[0] === nick ? 0 : 1;
        }
        if (data.type === 'start_round') {
            document.getElementById('status-text').innerText = `Раунд ${data.roundNum} из ${data.total}`;
            document.getElementById('status-text').style.color = "#fff";
            document.getElementById('map-overlay').style.display = 'none';
            document.getElementById('btn-buzz').disabled = false;
            map.setView([data.lat, data.lng], data.zoom);
        }
        if (data.type === 'zoom') map.setZoom(data.zoom);
        if (data.type === 'buzzed') {
            document.getElementById('btn-buzz').disabled = true; 
            document.getElementById('map-overlay').style.display = 'flex';
            if (data.playerIndex === myPlayerIndex) {
                document.getElementById('overlay-text').innerText = "ГОВОРИ ОТВЕТ ВСЛУХ!";
                document.getElementById('overlay-text').style.color = "#2ecc71";
            } else {
                document.getElementById('overlay-text').innerText = `ОТВЕЧАЕТ ${playerNames[data.playerIndex]}!`;
                document.getElementById('overlay-text').style.color = "#e74c3c";
            }
        }
        if (data.type === 'resume') {
            document.getElementById('map-overlay').style.display = 'none';
            if (data.failedPlayer !== myPlayerIndex) {
                document.getElementById('btn-buzz').disabled = false;
                document.getElementById('status-text').innerText = "Шанс перехвата!";
                document.getElementById('status-text').style.color = "#f1c40f";
            } else {
                document.getElementById('status-text').innerText = "Ты ошибся! Жди...";
                document.getElementById('status-text').style.color = "#e74c3c";
            }
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
        }
    });
}

window.sendBuzz = function() {
    if (myConn && myConn.open) {
        myConn.send({ type: 'buzz' });
        document.getElementById('btn-buzz').disabled = true;
    }
};

function initMap() {
    map = L.map('map', {
        zoomControl: false, dragging: false, scrollWheelZoom: false,
        doubleClickZoom: false, boxZoom: false, keyboard: false
    });
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri'
    }).addTo(map);
}
