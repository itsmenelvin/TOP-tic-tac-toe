function ticTacToe() {
  let playerOne = 'X';
  let playerTwo = 'O';
  let currentPlayer = playerOne;
  let foundWinner = false;
  const gameboard = ['', '', '', '', '', '', '', '', ''];
  const cells = document.querySelectorAll('.cell');
  const resetButton = document.querySelector('#reset-game');

  // Private Function
  function render() {
    cells.forEach((cell, index) => {
      cell.textContent = gameboard[index];
    });
  }

  function switchPlayer() {
    currentPlayer === playerOne
      ? (currentPlayer = playerTwo)
      : (currentPlayer = playerOne);
  }

  function play(index) {
    if (foundWinner) return; //restrict from filling, if winner found/true
    if (gameboard[index]) return; //restrict from filling, filled cells
    gameboard[index] = currentPlayer;
    switchPlayer();
    render();
    checkWinner();
  }

  function checkWinner() {
    const winningCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningCombination.forEach((currentCombination) => {
      const [a, b, c] = currentCombination;
      if (
        gameboard[a] === playerOne &&
        gameboard[b] === playerOne &&
        gameboard[c] === playerOne
      ) {
        cells[a].classList.add('comboStyle');
        cells[b].classList.add('comboStyle');
        cells[c].classList.add('comboStyle');
        foundWinner = true;
      } else if (
        gameboard[a] === playerTwo &&
        gameboard[b] === playerTwo &&
        gameboard[c] === playerTwo
      ) {
        cells[a].classList.add('comboStyle');
        cells[b].classList.add('comboStyle');
        cells[c].classList.add('comboStyle');
        foundWinner = true;
      }
    });
  }

  function reset() {
    for (let i = 0; i < gameboard.length; i++) {
      gameboard[i] = '';
    }
    cells.forEach((cell) => {
      cell.classList.remove('comboStyle');
    });
    foundWinner = false;
    render();
  }

  // Public Functions
  return {
    play,
    render,
    reset,
    cells, //public variables
    resetButton,
    foundWinner,
  };
}

const game = ticTacToe(); // create a tictactoe object name "game"
game.cells.forEach((cell) => {
  //listen on cell and invoke play() function with index argument based on cell id
  cell.addEventListener('click', () => {
    const cellNumber = parseInt(cell.id);
    game.play(cellNumber);
  });
});
game.resetButton.addEventListener('click', () => {
  // call reset() function if user click reset button
  game.reset();
});
