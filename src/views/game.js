import html from "html-literal";
import "../assets/css/views/game.scss";
import start from "../lib/engine";

const render = (state = {}) => {
  const winnerDisplay = state.currentState.complete && state.currentState.winner
    ? html`
      <div class="winner-overlay">
        <div class="winner-message">
          <h1>${state.getPlayerById(state.currentState.winner).name} Wins!</h1>
          <p class="winner-color ${state.getPlayerById(state.currentState.winner).color}">
            Player ${state.currentState.winner} (${state.getPlayerById(state.currentState.winner).color})
          </p>
          <button onclick="location.reload()">Play Again</button>
        </div>
      </div>
    `
    : '';

  return html`
    <div id="game-board" class="players-${state.currentState.players}"></div>
    ${winnerDisplay}
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

