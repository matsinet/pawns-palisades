import html from 'html-literal';
import '../assets/css/components/header.scss';

const render = (state = {}) => {
  return html``;
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