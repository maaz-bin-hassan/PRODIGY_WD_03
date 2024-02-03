const board = document.getElementById('board');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function renderBoard() {
  board.innerHTML = '';
  gameBoard.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = value;
    cell.addEventListener('click', () => handleCellClick(index));
    board.appendChild(cell);
  });
}

function handleCellClick(index) {
  if (gameOver || gameBoard[index] !== '') {
    return;
  }

  gameBoard[index] = currentPlayer;
  renderBoard();
  const result = checkWin();
  if (result) {
    alert(`${currentPlayer} wins!`);
    restartGame();
  } else if (!gameBoard.includes('')) {
    alert('It\'s a draw!');
    restartGame();
  } else {
    switchPlayer();
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameOver = true;
      return true;
    }
  }

  return false;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function restartGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  renderBoard();
}

renderBoard();
