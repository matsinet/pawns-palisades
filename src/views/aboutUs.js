import html from "html-literal";

const render = (state = {}) => html`
  <h1>About Us</h1>
`;

const hooks = {
  before: async (params, state = {}) => {},
  after: async (params, state = {}) => {}
};

export default {
  render,
  hooks
};

