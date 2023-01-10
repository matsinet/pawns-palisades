import html from 'html-literal';
import * as store from '../store';
import '../assets/css/components/header.scss';

const render = (state = {}) => {
  return html`<nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a href="/" class="navbar-item" data-navigo>Pawns & Palisades</a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end mr-4">
          ${!store.auth.token ? html`<a href="/login" class="navbar-item" data-navigo>Login</a>` : ''}
          ${store.auth.token ? html`<a href="/users/${store.auth.user._id}" class="navbar-item" data-navigo>Profile</a>` : ''}
          ${store.auth.token ? html`<a id="logout" class="navbar-item">Logout</a>` : ''}
        </div>
      </div>
    </nav>`;
};

const hooks = {
  before: async (params, state = {}) => {
    // console.log("Component header beforeHook fired");
  },
  after: async (params, state = {}) => {
    // console.log("Component header afterHook fired");
    if (!!document.getElementById("logout")) {
      document.getElementById("logout").addEventListener('click', event => {
        store.auth.logout();
      });
    }
  }
};

export default {
  render,
  hooks
};