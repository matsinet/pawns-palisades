import html from 'html-literal';
import '../assets/css/components/wall.scss';

const render = (orientation = 'h') => {
    const className = orientation === 'h' ? 'horizontal' : 'vertical';
    return html`
        <div class="wall ${className} is-placing">
            <span class="place">O</span>
            <span class="remove">X</span>
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