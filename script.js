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
    [0,1,2], [3,4,5], [6,7,8], //rows
    [0,3,6], [1,4,7], [2,5,8], //columns
    [0,4,8], [2,4,6], //diagonals
]

//DOM Elements
const cell = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const gameStatus = document.getElementById('gameStatus');
const resetBtn = document.getElementById('resetBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const scoreTie = document.getElementById('scoreTie');

//Event Handlers
function handleCellClick(index){
    if(!gameActive || board[index] !== '') return;

    board[index] = currentPlayer
    updateCell(index);

    if(checkWin()) {
        endGame(`Player ${currentPlayer} Wins!`);
        scores[currentPlayer]++;
        HighlightWinningCells();
    } else if (checkTie()){
        endGame(`It's a Tie!`);
        scores.tie++;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O': 'X'
        updateDisplay();
    }
}
