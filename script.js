const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const resetBtn = document.getElementById('reset')

let score = 0
let timeleft = 30
let gameActive = false
let timerInterval = null;

// --- Fonction pour déplacer le bouton
function moveTarget() {
    if (!gameActive) return;

    const gameRect = document.getElementById('game').getBoundingClientRect();
    const targetWidth = target.offsetWidth;
    const targetHeight = target.offsetHeight;

    // On calcule les limites pour que le bouton reste dans la zone de jeu
    const maxX = gameRect.width - targetWidth - 20;
    const maxY = gameRect.height - targetHeight - 80; // on laisse de la place pour le texte

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    target.style.position = 'absolute';
    target.style.left = randomX + 'px';
    target.style.top = randomY + 'px'
}

// --- Clic sur la cible ---
target.addEventListener('click', function () {
    if (!gameActive) return;

    score++;
    scoreDisplay.textContent = score;
    moveTarget();
});

// --- Démarrer le jeu ---

function startGame() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    gameActive = true;
    score = 0;
    timeleft = 30;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    target.disabled = false;
    target.style.position = 'relative';
    target.style.left = 'auto';
    target.style.top = 'auto';
    target.textContent = 'Clique-moi !';

    // On déplace toutes les 0.8s
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            gameActive = false;
            target.disabled = true;
            target.style.position = 'relative';
            target.style.left = 'auto';
            target.style.top = 'auto';
        } else {
            // On déplace le bouton à chaque seconde (sauf à la fin)
            moveTarget();
        }
    }, 1000);

    // Premier déplacement immédiat
    setTimeout(moveTarget, 50);
}

// --- Reset ---
resetBtn.addEventListener('click', function() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    startGame();
});

// --- Lancement automatique au chargement ---
window.addEventListener('load', startGame);

