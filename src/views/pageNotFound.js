import html from "html-literal";
import missing10mm from "../assets/img/missing-10mm.png";
// import "../assets/css/views/home.scss";

const render = (state = {}) => html`<div class="has-text-centered has-text-danger-dark">
  <h1 class="is-size-1">404</h1>
  <h1 class="is-size-3">There is something missing from the toolbox...</h1>
  <img src="${missing10mm}" alt="Missing 10mm socket">
  <h1 class="is-size-3">Please look on the floor!</h1>
</div>`;

const hooks = {
  before: async (params, state = {}) => {
    // console.log("home View beforeHook fired");
  },
  after: async (params, state = {}) => {
    // console.log("home View afterHook fired");
  }
};

export default {
  render,
  hooks
};

