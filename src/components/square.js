import html from 'html-literal';
import '../assets/css/components/square.scss';

const render = (state = {}) => {
  // ASCII character 'a' is 97, row 1 + 96 = 97
  return html`
    <div class="square" data-row="${state.row}" data-col="${state.column}">
      <div class="pawn"></div>
      <div class="move"></div>
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