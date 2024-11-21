import html from "html-literal";
import "../assets/css/views/game.scss";
import start from "../lib/engine";

const render = (state = {}) => {
  return html`
    <div id="game-board" class="players-${state.currentState.players}"></div>
  `;
}

const hooks = {
  before: async (params, state = {}) => {
    // console.log("home View beforeHook fired");
  },
  after: async (params, state = {}) => {
    start(state);
  }
};

export default {
  render,
  hooks
};

