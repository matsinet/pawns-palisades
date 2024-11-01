import html from 'html-literal';
import '../assets/css/components/anchor.scss';

const render = (state = {}) => {

  return html`
    <div
      class="anchor"
      data-row="${state.row}"
      data-column="${state.column}"
      data-orientation="${state.orientation || 'false'}"
      data-wall-placed="${state.wallPlaced || 'false'}"
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
    // console.log("Component header afterHook fired");
  }
};

export default {
  render,
  hooks
};