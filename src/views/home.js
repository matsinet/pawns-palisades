import html from "html-literal";
import logo from "../assets/img/logo.png";
import axios from "axios";
import "../assets/css/views/home.scss";

const render = (state = {}) => html`
  <div>
    <h2>Welcome to Pawns & Palisades</h2>
  </div>
`;

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

