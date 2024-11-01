import {anchor, spacer, square, wall} from "../components";
import * as store from "../store";

function drawBoard() {
  const gameBoard = document.getElementById('game-board');
  let rows = 1;
  let squareRow = 1;
  let content = '';
  while (rows <= 17) {
    let columns = 1;
    let squareColumn = 1;
    while (columns <= 17) {
      if (rows % 2) {
        // Square row
        if (columns % 2) {
          content += square.render({column: squareColumn, row: squareRow})
          squareColumn++;
        } else {
          content += spacer.render();
        }
      } else {
        // Anchor row
        if (columns % 2) {
          content += spacer.render()
        } else {
          content += anchor.render({column: squareColumn + 1, row: squareRow - 1});
          squareColumn++;
        }
      }
      columns++;
    }
    squareRow += rows % 2 ? 1 : 0;
    rows++;
  }

  gameBoard.innerHTML = content;

  document.querySelectorAll('.anchor')
    .forEach(element => element.addEventListener('click', event => {
      console.log(event.target.dataset);
      if (event.target.dataset.wallPlaced === 'false') {
        if (event.target.classList.contains('wall')) {
          if (event.target.classList.contains('horizontal')) {
            event.target.classList.remove('horizontal');
            event.target.classList.add('vertical');
            event.target.dataset.orientation = 'v';
            // event.target.dataset.wallPlaced = 'true';
          } else {
            event.target.classList.remove('vertical');
            event.target.classList.add('horizontal');
            event.target.dataset.orientation = 'h';
            // event.target.dataset.wallPlaced = 'true';
          }
        } else {
          removeMoves();
          placeWall(event.target);
        }
      }
    }));
}

function changeTurn() {
  const colors = ['blue', 'red'];

  if (store.game.currentState.players === 4) {
    colors.concat(['yellow', 'green']);
  }

  let turnIndex = colors.indexOf(store.game.currentState.turn);
  let nextIndex = turnIndex + 1;
  if (nextIndex === colors.length) {
    nextIndex = 0;
  }

  store.game.currentState.turn = colors[nextIndex];
}

function drawMoves(state) {
  const pawnDiv = document.querySelector(`div.square:has(div.${state.turn})`);

  pawnDiv.classList.add('is-turn');

  const row = parseInt(pawnDiv.dataset.row);
  const column = parseInt(pawnDiv.dataset.column);

  const nextColor = state.turn === 'blue' ? 'red' : 'blue';
  const opponentPawn = document.querySelector(`div.square:has(div.${nextColor})`);
  const opponentPawnRow = parseInt(opponentPawn.dataset.row);
  const opponentPawnColumn = parseInt(opponentPawn.dataset.column);

  const moves = [];

  // draw up
  if ((row + 1) <= 9) {
    let moveRow = row + 1;
    if (opponentPawnRow === moveRow && opponentPawnColumn === column) {
      moveRow = row + 2;
      if (moveRow <= 9) {
        moves.push([moveRow, column]);
      }
    } else {
      moves.push([moveRow, column]);
    }
  }

  // draw down
  if ((row - 1) >= 1) {
    let moveRow = row - 1;
    if (opponentPawnRow === moveRow && opponentPawnColumn === column) {
      moveRow = row - 2;
      if (moveRow >= 1) {
        moves.push([moveRow, column]);
      }
    } else {
      moves.push([moveRow, column]);
    }
  }

  // draw left
  if ((column - 1) >= 1) {
    let moveColumn = column - 1;
    if (opponentPawnRow === row && opponentPawnColumn === moveColumn) {
      moveColumn = column - 2;
      // Prevent the jump pawn from going off the board
      if (moveColumn >= 1) {
        moves.push([row, moveColumn]);
      }
    } else {
      moves.push([row, moveColumn]);
    }
  }

  // draw right
  if ((column + 1) <= 9) {
    let moveColumn = column + 1;
    if (opponentPawnRow === row && opponentPawnColumn === moveColumn) {
      moveColumn = column + 2;
      if (moveColumn <= 9) {
        moves.push([row, moveColumn]);
      }
    } else {
      moves.push([row, moveColumn]);
    }
  }

  console.log('matsinet - moves:', moves);

  moves.forEach(move => {
    const movePawn = document.querySelector(`[data-row="${move[0]}"][data-column="${move[1]}"] .move`);
    movePawn.classList.add('is-enabled');
    movePawn.classList.add(state.turn);

    movePawn.addEventListener('click', (event => {
      console.log('matsinet - move:', move);
      store.game.currentState[state.turn].pawn = move;
      store.game.currentState.turn = state.turn === 'blue' ? 'red' : 'blue';

      window.router.navigate('/game');
    }));
  });
}

function removeMoves() {
  console.log("removeMoves fired");
  document.querySelectorAll('.move').forEach(element => element.classList.remove('is-enabled'));
}

function placeWall(element) {
  const row = parseInt(element.dataset.row);
  const column = parseInt(element.dataset.column);

  let orientation = 'h';

  const leftWallColumn = column - 1;
  const leftWall = document.querySelector(`.anchor[data-row="${row}"][data-column="${leftWallColumn}"] .wall`);
  const rightWallColumn = column + 1;
  const rightWall = document.querySelector(`.anchor[data-row="${row}"][data-column="${rightWallColumn}"] .wall`);
  const aboveWall = document.querySelector(`.anchor[data-row="${row - 1}"][data-column="${element.dataset.column}"] .wall`);
  const belowWall = document.querySelector(`.anchor[data-row="${row + 2}"][data-column="${element.dataset.column}"] .wall`);

  // TODO: Wall placement still needs work, try placing wall in a "cross" then put a wall in a corner
  if ((leftWall && leftWall.classList.contains('horizontal')) || (rightWall && rightWall.classList.contains('horizontal'))) {
    orientation = 'v';
  } else if ((aboveWall && aboveWall.classList.contains('vertical')) || (belowWall && belowWall.classList.contains('vertical'))) {
    orientation = 'h';
  } else if ((leftWall && leftWall.classList.contains('horizontal')) || (aboveWall && aboveWall.classList.contains('horizontal'))) {
    orientation = 'v';
  } else if ((leftWall !== null || rightWall !== null) && (aboveWall !== null || belowWall !== null)) {
    orientation = 'x';
    console.log('Wall cannot be placed');
  }

  if (orientation !== 'x') {
    element.innerHTML = wall.render(orientation);

    store.game.currentState.walls.push([row, column, orientation, store.game.currentState.turn]);
    store.game.currentState[store.game.currentState.turn].walls -= 1;
  }

  // element.addEventListener('click', event => {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     console.log('matsinet - event.target:', event.target);
  // });

  changeTurn();
  // window.router.navigate('/game');
}

function updateBoard(state) {
  // Draw pawns for 2 player game
  const bluePawn = document.querySelector(`[data-row="${state.blue.pawn[0]}"][data-column="${state.blue.pawn[1]}"] .pawn`);
  const redPawn = document.querySelector(`[data-row="${state.red.pawn[0]}"][data-column="${state.red.pawn[1]}"] .pawn`);

  bluePawn.classList.add('blue');
  bluePawn.classList.toggle('is-enabled');
  redPawn.classList.add('red');
  redPawn.classList.toggle('is-enabled');

  if (state.blue.pawn[0] === state.blue.winningSide) {
    alert("Blue wins");
    store.game.currentState.complete = true;
  }

  if (state.red.pawn[0] === state.red.winningSide) {
    alert("Red wins");
    store.game.currentState.complete = true;
  }

  // Draw pawns for 4 player game
  if (state.players === 4) {
    store.game.currentState.blue.walls = 5;
    store.game.currentState.red.walls = 5;

    const yellowPawn = document.querySelector(`[data-row="${state.yellow.pawn[0]}"][data-column="${state.yellow.pawn[1]}"] .pawn`);
    const greenPawn = document.querySelector(`[data-row="${state.green.pawn[0]}"][data-column="${state.green.pawn[1]}"] .pawn`);

    yellowPawn.classList.add('yellow');
    yellowPawn.classList.toggle('is-enabled');
    greenPawn.classList.add('green');
    greenPawn.classList.toggle('is-enabled');

    if (state.yellow.pawn[0] === state.yellow.winningSide) {
      alert("Yellow wins");
      store.game.currentState.complete = true;
    }

    if (state.green.pawn[0] === state.green.winningSide) {
      alert("Green wins");
      store.game.currentState.complete = true;
    }
  }

  // Draw walls
  state.walls.forEach(wallData => {
    const anchor = document.querySelector(`.anchor[data-row="${wallData[0]}"][data-column="${wallData[1]}"]`);
    anchor.dataset.wallPlaced = 'true';
    anchor.dataset.orientation = 'horizontal'
    // anchor.innerHTML = wall.render(wallData[2]);

    // const wallElement = anchor.getElementsByClassName('wall')[0];
    console.log('matsinet - wallElement:', wallElement);
  });

  console.log('matsinet - state:', state);
}

export default function start(state) {
  drawBoard(state);
  updateBoard(state)
  if (!state.complete) {
    drawMoves(state);
  }
}