function ticTacToe() {
  const playerOne = 'X';
  const playerTwo = 'O';
  let defaultPlayer = playerOne;
  let foundWinner = false;
  let gameMode;
  const gameBoard = ['', '', '', '', '', '', '', '', ''];
  const functions = [];
  const cells = document.querySelectorAll('.cell');
  const resetButton = document.querySelector('#reset-game');
  const newGameButton = document.querySelector('#new-game');
  const options = Array.from(document.querySelectorAll('input[name="mode"]'));

  // Private Function
  function switchPlayer() {
    if (defaultPlayer === playerOne) {
      defaultPlayer = playerTwo;
    } else {
      defaultPlayer = playerOne;
    }
  }

  function render() {
    cells.forEach((cell, index) => {
      cell.textContent = gameBoard[index];
    });
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

    winningCombination.forEach((currComb) => {
      const [a, b, c] = currComb;
      if (
        gameBoard[a] !== ''
        && gameBoard[a] === gameBoard[b]
        && gameBoard[b] === gameBoard[c]
      ) {
        currComb.forEach((curr) => cells[curr].classList.add('comboStyle'));
        foundWinner = true;
      }
    });
  }

  function play(index) {
    if (gameBoard[index]) return; // restrict from filling, filled cells
    if (foundWinner) return; // restrict from filling, if winner found/true
    gameBoard[index] = defaultPlayer;
    switchPlayer();
    render();
    checkWinner();
  }

  function reset() {
    defaultPlayer = playerOne;
    foundWinner = false;
    cells.forEach((cell, index) => {
      gameBoard[index] = '';
      cell.classList.remove('comboStyle');
      cell.removeEventListener('click', functions[index]);
    });
    render();
  }

  function randomMove() {
    if (defaultPlayer === playerOne) return;
    // This function is gonna find an empty cell and filled it
    for (let i = 0; i <= 8; i++) {
      const randMove = Math.floor(Math.random() * 9);
      if (gameBoard[randMove] === '') {
        play(randMove);
        i = 8;
      }
    }
  }

  // ### Game Mode ###
  function vsHuman() {
    cells.forEach((cell, index) => {
      functions[index] = play;
      // Assign the 'play' function to the corresponding index in the 'functions' array
      // to enable removal of the function during the 'reset' function
      cell.addEventListener('click', () => {
        // Invoke the 'play' function with the 'index' argument,
        // which corresponds to the clicked cell
        if (gameMode === 'human') functions[index](index);
      });
    });
  }

  function vsEasyAi() {
    functions.length = 0;
    cells.forEach((cell, index) => {
      functions[index] = [play, randomMove];
      // Assign the 'play' and 'randomMove' functions to the
      // corresponding index in the 'functions' array
      cell.addEventListener('click', () => {
        if (gameMode === 'easy-ai') {
          // Invoke the 'play' function with the 'index' argument,
          // which corresponds to the clicked cell
          functions[index][0](index);
          // Invoke the 'randomMove' function
          functions[index][1]();
        }
      });
    });
  }

  // Ai Hard

  // Immediately Invoked Function Expression (IIFE)
  (function () {
    console.log(
      "Don't forget to laugh and have fun while playing Tic Tac Toe! 🤣",
    );
    resetButton.addEventListener('click', reset);
    newGameButton.addEventListener('click', () => {
      reset();
      [gameMode] = options
        .filter((opt) => opt.checked)
        .map((opt) => opt.id);
      if (gameMode === 'human') vsHuman();
      if (gameMode === 'easy-ai') vsEasyAi();
      if (gameMode === 'hard-ai') { console.log('Ai Hard is not implemented yet...'); }
    });
  }());

  return {
    reset,
  };
}

const game = ticTacToe();
