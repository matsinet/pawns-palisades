import html from "html-literal";
import "../assets/css/views/game.scss";
import start from "../lib/engine";

const render = (state = {}) => html`
  <div id="game-board" class="players-${state.currentState.players}"></div>
`;

const hooks = {
  before: async (params, state = {}) => {
    // console.log("home View beforeHook fired");
  },
  after: async (params, state = {}) => {
    console.log('matsinet - state.currentState:', state.currentState);

    start(state.currentState);
  }
};

export default {
  render,
  hooks
};

