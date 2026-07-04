let board = Array(9).fill('');

//while playing ['X', 'O', '']
let currentPlayer = 'X';
let gameActive = true;
let scores = {
    X: 0,
    O: 0,
    tie: 0
}

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
    [0, 4, 8], [2, 4, 6], //diagonals
]

//DOM Elements
const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const gameStatus = document.getElementById('gameStatus');
const resetBtn = document.getElementById('resetBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreTie = document.getElementById('scoreTie');

//Event Handlers
function handleCellClick(index) {
    if (!gameActive || board[index] !== '') return;

    board[index] = currentPlayer
    updateCell(index);

    if (checkWin()) {
        endGame(`Player ${currentPlayer} Wins!`);
        scores[currentPlayer]++;
        highlightWinningCells();
    } else if (checkTie()) {
        endGame(`It's a Tie!`);
        scores.tie++;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        updateDisplay();
    }

    updateScoreDisplay();
}

function updateCell(index) {
    const cell = cells[index];
    cell.textContent = currentPlayer;
    cell.classList.add('taken', currentPlayer.toLowerCase());
}

function checkWin() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    })
}

function checkTie() {
    return board.every(cell => cell !== "");
}

function highlightWinningCells() {
    const winPattern = winPatterns.find(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });

    if (winPattern) {
        winPattern.forEach(index => {
            cells[index].classList.add('winner');
        })
    }
}

function endGame(message) {
    gameActive = false;
    const messageClass = message.includes('Tie') ? 'tie-message' : 'winner-message';
    gameStatus.innerHTML = `<div class="${messageClass}">${message}</div>`;
    currentPlayerDisplay.textContent = 'Game Over';
}

function resetGame() {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = ''
        cell.classList.remove('taken', 'x', 'o', 'winner')
    });

    gameStatus.textContent = ''
    updateDisplay()
}

function resetScore() {
    scores = {
        X: 0,
        O: 0,
        tie: 0
    };

    updateScoreDisplay();
}

function updateDisplay() {
    currentPlayerDisplay.textContent = `Player ${currentPlayer}'s Turn`
    currentPlayerDisplay.style.color = currentPlayer === 'X' ? '#ff6b6b' : '#4ecdc4'
}

function updateScoreDisplay() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreTie.textContent = scores.tie;
}

function initializeGame() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index))
    })

    resetBtn.addEventListener('click', resetGame)
    resetScoreBtn.addEventListener('click', resetScore)

    updateDisplay();
}

document.addEventListener('DOMContentLoaded', initializeGame);