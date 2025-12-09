// REAL PLAYABLE GAMES GENERATOR - Creates actual working games

class RealGamesGenerator {
    generatePlatformerGame(name, description) {
        return {
            'index.html': `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: Arial, sans-serif;
        }
        canvas {
            border: 4px solid #fff;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        #ui {
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 24px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
        }
    </style>
</head>
<body>
    <div id="ui">Puntos: <span id="score">0</span> | Vidas: <span id="lives">3</span></div>
    <canvas id="game" width="800" height="600"></canvas>
    <script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let score = 0, lives = 3, gameOver = false;

const player = { x: 50, y: 450, w: 40, h: 40, vy: 0, jumping: false, color: '#ff6b6b' };
const platforms = [
    { x: 0, y: 550, w: 800, h: 50 },
    { x: 200, y: 450, w: 150, h: 20 },
    { x: 450, y: 350, w: 150, h: 20 }
];
let coins = [], enemies = [];

for (let i = 0; i < 15; i++) {
    coins.push({ x: Math.random() * 700 + 50, y: Math.random() * 400 + 50, w: 20, h: 20, active: true });
}

const keys = {};
window.addEventListener('keydown', e => {
    keys[e.key] = true;
    if (e.key === ' ' && !player.jumping) { player.vy = -15; player.jumping = true; }
});
window.addEventListener('keyup', e => keys[e.key] = false);

function update() {
    if (gameOver) return;
    
    if (keys['ArrowLeft']) player.x -= 5;
    if (keys['ArrowRight']) player.x += 5;
    
    player.vy += 0.6;
    player.y += player.vy;
    player.jumping = true;
    
    platforms.forEach(p => {
        if (player.x < p.x + p.w && player.x + player.w > p.x &&
            player.y + player.h > p.y && player.y + player.h < p.y + p.h && player.vy > 0) {
            player.y = p.y - player.h;
            player.vy = 0;
            player.jumping = false;
        }
    });
    
    coins.forEach(c => {
        if (c.active && player.x < c.x + c.w && player.x + player.w > c.x &&
            player.y < c.y + c.h && player.y + player.h > c.y) {
            c.active = false;
            score += 10;
            document.getElementById('score').textContent = score;
        }
    });
    
    if (Math.random() < 0.02) enemies.push({ x: 800, y: 510, w: 30, h: 40 });
    
    enemies.forEach((e, i) => {
        e.x -= 3;
        if (player.x < e.x + e.w && player.x + player.w > e.x &&
            player.y < e.y + e.h && player.y + player.h > e.y) {
            lives--;
            document.getElementById('lives').textContent = lives;
            enemies.splice(i, 1);
            if (lives <= 0) { gameOver = true; alert('Game Over! Puntos: ' + score); }
        }
        if (e.x < -50) enemies.splice(i, 1);
    });
    
    if (player.y > 600) { lives--; player.y = 100; document.getElementById('lives').textContent = lives; }
}

function draw() {
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, 800, 600);
    
    platforms.forEach(p => {
        ctx.fillStyle = '#2ecc71';
        ctx.fillRect(p.x, p.y, p.w, p.h);
    });
    
    coins.forEach(c => {
        if (c.active) {
            ctx.fillStyle = '#f1c40f';
            ctx.beginPath();
            ctx.arc(c.x + 10, c.y + 10, 10, 0, Math.PI * 2);
            ctx.fill();
        }
    });
    
    enemies.forEach(e => {
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(e.x, e.y, e.w, e.h);
    });
    
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.w, player.h);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
    </script>
</body>
</html>`,
            'README.md': `# ${name}\n\n${description}\n\n## 🎮 Jugar\n\nAbre index.html en tu navegador\n\n## Controles\n- Flechas: Mover\n- Espacio: Saltar\n\n## Objetivo\n- Recoge monedas doradas\n- Evita enemigos rojos\n- ¡No caigas!`
        };
    }

    generatePuzzleGame(name, description) {
        return {
            'index.html': `<!DOCTYPE html>
<html>
<head>
    <title>${name}</title>
    <style>
        body { background: #2c3e50; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: Arial; }
        #game { background: white; padding: 20px; border-radius: 10px; }
        .grid { display: grid; grid-template-columns: repeat(4, 100px); gap: 10px; }
        .tile { width: 100px; height: 100px; background: #3498db; border: none; font-size: 32px; color: white; cursor: pointer; border-radius: 5px; }
        .tile:hover { background: #2980b9; }
        .empty { background: #ecf0f1; }
        h1 { color: #2c3e50; text-align: center; }
        #moves { text-align: center; color: #7f8c8d; margin: 10px 0; }
    </style>
</head>
<body>
    <div id="game">
        <h1>${name}</h1>
        <div id="moves">Movimientos: <span id="count">0</span></div>
        <div class="grid" id="grid"></div>
    </div>
    <script>
let tiles = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
let moves = 0;

function shuffle() {
    for (let i = 0; i < 1000; i++) {
        const empty = tiles.indexOf(0);
        const neighbors = [];
        if (empty % 4 > 0) neighbors.push(empty - 1);
        if (empty % 4 < 3) neighbors.push(empty + 1);
        if (empty > 3) neighbors.push(empty - 4);
        if (empty < 12) neighbors.push(empty + 4);
        const random = neighbors[Math.floor(Math.random() * neighbors.length)];
        [tiles[empty], tiles[random]] = [tiles[random], tiles[empty]];
    }
    render();
}

function render() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    tiles.forEach((num, i) => {
        const tile = document.createElement('button');
        tile.className = 'tile' + (num === 0 ? ' empty' : '');
        tile.textContent = num || '';
        tile.onclick = () => move(i);
        grid.appendChild(tile);
    });
}

function move(i) {
    const empty = tiles.indexOf(0);
    const valid = [empty-1, empty+1, empty-4, empty+4];
    if (valid.includes(i) && Math.abs(i - empty) !== 3) {
        [tiles[i], tiles[empty]] = [tiles[empty], tiles[i]];
        moves++;
        document.getElementById('count').textContent = moves;
        render();
        if (tiles.join('') === '123456789101112131415 0') alert('¡Ganaste en ' + moves + ' movimientos!');
    }
}

shuffle();
    </script>
</body>
</html>`,
            'README.md': `# ${name}\n\n${description}\n\nJuego de puzzle deslizante. Ordena los números del 1 al 15.`
        };
    }

    generateArcadeGame(name, description) {
        return {
            'index.html': `<!DOCTYPE html>
<html>
<head>
    <title>${name}</title>
    <style>
        body { background: #000; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        canvas { border: 2px solid #0f0; }
    </style>
</head>
<body>
    <canvas id="game" width="400" height="600"></canvas>
    <script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const player = { x: 175, y: 500, w: 50, h: 50, speed: 5 };
let bullets = [], enemies = [], score = 0, gameOver = false;

const keys = {};
window.addEventListener('keydown', e => {
    keys[e.key] = true;
    if (e.key === ' ') bullets.push({ x: player.x + 20, y: player.y, w: 5, h: 15 });
});
window.addEventListener('keyup', e => keys[e.key] = false);

setInterval(() => {
    if (!gameOver) enemies.push({ x: Math.random() * 350, y: -30, w: 30, h: 30 });
}, 1000);

function update() {
    if (gameOver) return;
    
    if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
    if (keys['ArrowRight'] && player.x < 350) player.x += player.speed;
    
    bullets.forEach((b, i) => {
        b.y -= 7;
        if (b.y < 0) bullets.splice(i, 1);
    });
    
    enemies.forEach((e, i) => {
        e.y += 2;
        if (e.y > 600) { enemies.splice(i, 1); score -= 5; }
        
        bullets.forEach((b, j) => {
            if (b.x < e.x + e.w && b.x + b.w > e.x && b.y < e.y + e.h && b.y + b.h > e.y) {
                enemies.splice(i, 1);
                bullets.splice(j, 1);
                score += 10;
            }
        });
        
        if (player.x < e.x + e.w && player.x + player.w > e.x &&
            player.y < e.y + e.h && player.y + player.h > e.y) {
            gameOver = true;
            alert('Game Over! Score: ' + score);
        }
    });
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 400, 600);
    
    ctx.fillStyle = '#0f0';
    ctx.fillRect(player.x, player.y, player.w, player.h);
    
    ctx.fillStyle = '#ff0';
    bullets.forEach(b => ctx.fillRect(b.x, b.y, b.w, b.h));
    
    ctx.fillStyle = '#f00';
    enemies.forEach(e => ctx.fillRect(e.x, e.y, e.w, e.h));
    
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
    </script>
</body>
</html>`,
            'README.md': `# ${name}\n\n${description}\n\nJuego arcade de disparos. Destruye enemigos y sobrevive.`
        };
    }
}

// Make it available globally
window.RealGamesGenerator = RealGamesGenerator;
