import html from 'html-literal';
import '../assets/css/components/anchor.scss';

const render = (state = {}) => {
  return html`
    <div class="anchor" data-row="${state.row}" data-column="${String.fromCharCode(state.column + 96)}"></div>
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