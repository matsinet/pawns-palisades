import html from 'html-literal';
import '../assets/css/components/anchor.scss';

const render = (state = {}) => {

  return html`
    <div
      class="anchor"
      data-row="${state.row}"
      data-col="${state.column}"
    >
      ${
        state.wallPlaced === 'true' ? `
        <div class="wall ${state.orientation} is-placing">
          <span class="place">O</span>
          <span class="remove">X</span>
        </div>
        ` : '' 
      }
    </div>
  `;
};

const hooks = {
  before: async (params, state = {}) => {
    // console.log("Component header beforeHook fired");
  },
  after: async (params, state = {}) => {
    console.log("Component anchor afterHook fired");
    document.querySelectorAll('.anchor')
      .forEach(element => element.addEventListener('click', event => {
        const {row, col} = event.target.dataset;
        store.game.currentState.walls.horizontal[row][col] = 9;
        router.navigate('/game');
      }));
  }
};

export default {
  render,
  hooks
};