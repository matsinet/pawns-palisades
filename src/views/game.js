import html from "html-literal";
import "../assets/css/views/game.scss";
import { square, anchor, spacer } from "../components";



const render = (state = {}) => html`
  <div id="game-board" class="players-4"></div>
`;

function drawBoard() {
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
}

function updateBoard(state) {
  const bluePawn = document.querySelector(`[data-row="${state.state.blue.pawn[0]}"][data-column="${state.state.blue.pawn[1]}"] .pawn`);
  const redPawn = document.querySelector(`[data-row="${state.state.red.pawn[0]}"][data-column="${state.state.red.pawn[1]}"] .pawn`);

  bluePawn.classList.add('blue');
  bluePawn.classList.toggle('is-turn');
  redPawn.classList.add('red');
  redPawn.classList.toggle('is-turn');
}

const hooks = {
  before: async (params, state = {}) => {
    // console.log("home View beforeHook fired");
  },
  after: async (params, state = {}) => {
    drawBoard(state);

    updateBoard(state);
  }
};

export default {
  render,
  hooks
};

