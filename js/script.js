'use strict';

const statusDisplay = document.getElementById('status');
const count = document.getElementById('numberTurns');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winnMessage = () => `${currentPlayer} has won!`;
const drawMessage = () => `it's a draw!`;

const winnLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handlePlayerTurn() {
  const p1 = document.getElementById('player1'),
        p2 = document.getElementById('player2');

  if (currentPlayer === 'X') {
    p1.style.background = '#8458B3';
    p2.style.background = '#d0bdf4';
  } else {
    p1.style.background = '#d0bdf4';
    p2.style.background = '#8458B3';
  }
};

function handleClick(event) {
  let clickedIndex = Number(event.target.getAttribute('id'));

  if (gameState[clickedIndex] !== '' || !gameActive)
    return;
  gameState[clickedIndex] = currentPlayer;
  event.target.innerHTML = currentPlayer;
  count.innerHTML = +count.innerHTML + 1;
  handleResult();
}

function handleResult() {
    let roundWon = false,
        winLine, a ,b, c, i;

    for (i = 0; i < 8; ++i) {
      winLine = winnLines[i];
      a = gameState[winLine[0]];
      b = gameState[winLine[1]];
      c = gameState[winLine[2]];
      if (a === b && b === c && c !== '') {
        roundWon = true;
        break;
      }
    }

    if (roundWon || !gameState.includes('')) {
      if (roundWon) {
        statusDisplay.innerHTML = winnMessage();
        statusDisplay.style.color = '#139de2';
        winColors(winLine)
      }
      else
        statusDisplay.innerHTML = drawMessage();
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    handlePlayerTurn();
}

function winColors(line) {
  console.log(`${line}`);
  for (let i = 0; i < 3; ++i) {
    let cell = document.getElementById(`${line[i]}`);
    cell.style.color = '#139de2';
    cell.style.fontSize = '80px';
  }
}

function handleRestart() {
    gameActive = true;
    currentPlayer = 'X';
    count.innerHTML = '0';
    statusDisplay.innerHTML = '';
    statusDisplay.style.color = 'black';
    gameState = ['', '', '', '', '', '', '', '', ''];
    handlePlayerTurn();

    let x = document.getElementsByClassName('cell');
    for (let i = 0; x[i]; ++i) {
      x[i].innerHTML = '';
      x[i].style.color = '#232d55';
      x[i].style.fontSize = '60px';
    }
}

handlePlayerTurn();

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('cell')) {
    handleClick(event);
  }
}, false);

document.getElementById('restart').addEventListener('click', handleRestart);