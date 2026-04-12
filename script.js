// БАЗА ДАННЫХ ЛОКАЦИЙ (Координаты: Широта, Долгота). Можешь добавлять бесконечно!
const gameLocations = [
    { lat: 48.8584, lng: 2.2945, name: "Эйфелева башня" },
    { lat: 40.6892, lng: -74.0445, name: "Статуя Свободы" },
    { lat: 55.7539, lng: 37.6208, name: "Красная площадь" },
    { lat: 27.9881, lng: 86.9250, name: "Эверест" },
    { lat: -33.8568, lng: 151.2153, name: "Сиднейская опера" }
];

const urlParams = new URLSearchParams(window.location.search);
let hostIdFromUrl = urlParams.get('host');
const peer = new Peer();

// Роли и сеть
let isHost = !hostIdFromUrl;
let players = []; // Для хоста: массив подключений [p1_conn, p2_conn]
let myConn = null; // Для игрока: подключение к хосту
let myPlayerIndex = -1; // 0 = P1, 1 = P2

// Состояние игры
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
        document.getElementById('nick-input').style.display = 'none'; // Ведущему ник не нужен
        
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
        if (players.length >= 2) { conn.close(); return; } // Мест нет
        
        const playerIndex = players.length;
        players.push(conn);
        
        conn.on('data', (data) => {
            if (data.type === 'join') {
                playerNames[playerIndex] = data.name;
                document.getElementById('lobby-status').innerText = `Ждем игроков (${players.length}/2)...`;
                
                // Если оба зашли - разрешаем старт
                if (players.length === 2) {
                    document.getElementById('lobby-status').innerText = "Оба игрока готовы!";
                    document.getElementById('lobby-status').style.color = "#2ecc71";
                    document.getElementById('btn-start').disabled = false;
                    
                    // Обновляем имена всем
                    broadcast({ type: 'names', names: playerNames });
                }
            }
            if (data.type === 'buzz') {
                handleBuzz(playerIndex);
            }
        });
    });
}

function startRoundAsHost() {
    document.getElementById('setup-overlay').style.display = 'none';
    document.getElementById('main-game-container').style.display = 'flex';
    document.getElementById('host-controls').style.display = 'none';
    
    if(!map) initMap();
    
    currentZoom = 18;
    const loc = gameLocations[currentRound];
    
    document.getElementById('status-text').innerText = `Раунд ${currentRound + 1}. Поиск...`;
    document.getElementById('status-text').style.color = "#fff";
    document.getElementById('map-overlay').style.display = 'none';

    // Отправляем всем команду на старт раунда
    broadcast({ type: 'start_round', lat: loc.lat, lng: loc.lng, zoom: currentZoom });
    
    // Хост тоже видит карту
    map.setView([loc.lat, loc.lng], currentZoom);

    clearInterval(zoomInterval);
    zoomInterval = setInterval(() => {
        currentZoom--;
        map.setZoom(currentZoom);
        broadcast({ type: 'zoom', zoom: currentZoom });
        
        if (currentZoom <= 3) {
            clearInterval(zoomInterval); // Дошли до максимума
        }
    }, 5000);
}

function handleBuzz(playerIndex) {
    clearInterval(zoomInterval); // Стоп зум
    broadcast({ type: 'buzzed', playerIndex: playerIndex });
    
    // Показываем интерфейс судьи
    document.getElementById('map-overlay').style.display = 'flex';
    document.getElementById('overlay-text').innerText = `ОТВЕЧАЕТ ${playerNames[playerIndex].toUpperCase()}!`;
    document.getElementById('host-controls').style.display = 'flex';
    document.getElementById('answering-player-name').innerText = playerNames[playerIndex];
    
    // Сохраняем, кто сейчас отвечает, чтобы начислить/отнять баллы
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
        // Если ошибка - игра продолжается для второго игрока!
        resumeRoundHost(window.activeBuzzer);
    }
}

window.skipRound = function() {
    document.getElementById('host-controls').style.display = 'none';
    endRoundHost();
}

function resumeRoundHost(failedPlayerIndex) {
    document.getElementById('map-overlay').style.display = 'none';
    // Продолжаем зумить
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
    document.getElementById('status-text').innerText = `Ответ: ${gameLocations[currentRound].name}`;
    document.getElementById('status-text').style.color = "#2ecc71";
    document.getElementById('map-overlay').style.display = 'none';
    
    setTimeout(() => {
        currentRound++;
        if (currentRound < gameLocations.length) {
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
            document.getElementById('status-text').innerText = "СМОТРИ НА КАРТУ!";
            document.getElementById('status-text').style.color = "#fff";
            document.getElementById('map-overlay').style.display = 'none';
            document.getElementById('btn-buzz').disabled = false;
            map.setView([data.lat, data.lng], data.zoom);
        }
        if (data.type === 'zoom') {
            map.setZoom(data.zoom);
        }
        if (data.type === 'buzzed') {
            document.getElementById('btn-buzz').disabled = true; // Блокируем кнопку
            document.getElementById('map-overlay').style.display = 'flex';
            if (data.playerIndex === myPlayerIndex) {
                document.getElementById('overlay-text').innerText = "ГОВОРИ ОТВЕТ В СЛУХ!";
                document.getElementById('overlay-text').style.color = "#2ecc71";
            } else {
                document.getElementById('overlay-text').innerText = `ОТВЕЧАЕТ ${playerNames[data.playerIndex]}!`;
                document.getElementById('overlay-text').style.color = "#e74c3c";
            }
        }
        if (data.type === 'resume') {
            document.getElementById('map-overlay').style.display = 'none';
            // Если ошибся НЕ я, я могу снова жать кнопку
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
        }
    });
}

window.sendBuzz = function() {
    if (myConn && myConn.open) {
        myConn.send({ type: 'buzz' });
        document.getElementById('btn-buzz').disabled = true;
    }
};

// === НАСТРОЙКА КАРТЫ LEAFLET ===
function initMap() {
    // Создаем карту, отключаем любые взаимодействия (чтобы нельзя было сдвинуть или отдалить самому)
    map = L.map('map', {
        zoomControl: false, dragging: false, scrollWheelZoom: false,
        doubleClickZoom: false, boxZoom: false, keyboard: false
    });

    // Подключаем бесплатные спутниковые снимки от Esri (работают без API ключа)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri'
    }).addTo(map);
}