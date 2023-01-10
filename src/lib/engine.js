import { square, anchor, spacer } from "../components";
import * as store from "../store";

function initBoard() {
    const gameBoard = document.getElementById('game-board');
    let rows = 1;
    squareRow = 1;
    let content = '';
    while (rows <= 17) {
        let columns = 1;
        let squareColumn = 1;
        while (columns <= 17) {
            if (rows % 2) {
                // Square row
                if (columns % 2) {
                    content += square.render({ column: squareColumn, row: squareRow })
                    squareColumn++;
                } else {
                    content += spacer.render();
                }
            } else {
                // Anchor row
                if (columns % 2) {
                    content += spacer.render()
                } else {
                    content += anchor.render({ column: squareColumn + 1, row: squareRow - 1 });
                    squareColumn++;
                }
            }
            columns++;
        }
        squareRow += rows % 2 ? 1 : 0;
        rows++;
    }

    gameBoard.innerHTML = content;

    document.querySelectorAll('.anchor').forEach(element => element.addEventListener('click', event => {
        removeMoves();
    }));
}

function drawMoves(state) {
    const pawnDiv = document.querySelector(`div.square:has(div.${state.turn})`);

    pawnDiv.classList.add('is-turn');

    const row = parseInt(pawnDiv.dataset.row);
    const column = pawnDiv.dataset.column.charCodeAt(0);

    const nextColor = state.turn === 'blue' ? 'red' : 'blue';
    const opponentPawn = document.querySelector(`div.square:has(div.${nextColor})`);
    const opponentPawnRow = parseInt(opponentPawn.dataset.row);
    const opponentPawnColumn = opponentPawn.dataset.column.charCodeAt(0);

    const moves = [];

    // draw up
    if ((row + 1) < 10) {
        let moveRow = row + 1;
        if (opponentPawnRow === moveRow && opponentPawnColumn === column) {
            moveRow = row + 2;
            if (moveRow < 10) {
                moves.push([moveRow, String.fromCharCode(column)]);
            }
        } else {
            moves.push([moveRow, String.fromCharCode(column)]);
        }
    }

    // draw down

    if ((row - 1) > 0) {
        let moveRow = row - 1;
        if (opponentPawnRow === moveRow && opponentPawnColumn === column) {
            moveRow = row - 2;
            if (moveRow > 0) {
                moves.push([moveRow, String.fromCharCode(column)]);
            }
        } else {
            moves.push([moveRow, String.fromCharCode(column)]);
        }
    }

    // draw left
    if ((column - 1) > 96) {
        let moveColumn = column - 1;
        if (opponentPawnRow === row && opponentPawnColumn === moveColumn) {
            moveColumn = column - 2;
            // Prevent the jump pawn from going off the board
            if (moveColumn > 96) {
                moves.push([row, String.fromCharCode(moveColumn)]);
            }
        } else {
            moves.push([row, String.fromCharCode(moveColumn)]);
        }
    }

    // draw right
    if ((column + 1) < 106) {
        let moveColumn = column + 1;
        if (opponentPawnRow === row && opponentPawnColumn === moveColumn) {
            moveColumn = column + 2;
            if (moveColumn < 106) {
                moves.push([row, String.fromCharCode(moveColumn)]);
            }
        } else {
            moves.push([row, String.fromCharCode(moveColumn)]);
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

function updateBoard(state) {
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

    // TODO: Handle yellow and green pawns when 4 players
    if (state.players === 4) {
        
    }
}

export default function start(state) {
    initBoard(state);
    updateBoard(state)
    if (! state.complete) {
      drawMoves(state);
    }
}