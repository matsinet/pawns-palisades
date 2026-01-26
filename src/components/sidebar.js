import html from 'html-literal';
import '../assets/css/components/sidebar.scss';

const render = (state = {}) => html`
  <aside class="menu m-4">
    <p class="menu-label mb-0">Game</p>
    <ul class="menu-list">
      <li><a href="/lobby" class="active" data-navigo>Lobby</a></li>
      <!-- <li><a href="/game" data-navigo>Game</a></li> -->
    </ul>
    <!-- <p class="menu-label mb-0">Admin</p>
    <ul class="menu-list">
      <li><a href="/users" data-navigo>Users</a></li>
    </ul> -->
    <p class="menu-label mb-0">Info</p>
    <ul class="menu-list">
      <li><a href="/about-us" data-navigo>About Us</a></li>
    </ul>
  </aside>
`;

const hooks = {
  before: async (params, state = {}) => {
    // console.log("Component beforeHook fired");
  },
  after: async (params, state = {}) => {
    // console.log("Component afterHook fired");
  }
};

export default {
  render,
  hooks
};
