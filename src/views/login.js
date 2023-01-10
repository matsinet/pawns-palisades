import html from "html-literal";
import * as store from "../store";
import axios from "axios";
import "../assets/css/views/login.scss";

const render = (state = {}) => html`
<div class="columns">
  <div class="column"></div>
  <div class="column is-one-quarter">
    <div class="card mt-5">
      <form id="loginForm" class="has-text-centered">
        <div class="card-header has-background-dark">
          <div class="card-header-title has-text-link-light">
            Login
          </div>
        </div>
        <div class="card-content">
          <div class="field">
            <label for="email" class="label">E-mail Address</label>
            <div class="control">
              <input id="email" type="email" class="input">
            </div>
          </div>
          <div class="field">
            <label for="email" class="label">Password</label>
            <div class="control">
              <input id="password" type="password" class="input">
            </div>
          </div>
          <p class="help has-text-danger is-size-6 has-text-weight-semibold">Error message here</p>
        </div>
        <div class="card-footer">
          <div class="card-footer-item has-text-right">
            <button id="login" class="button is-primary " type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="column"></div>
</div>
<div class="has-text-centered">
  <p>Don't have an account? </p>
  <div id="register" class="button is-info register-link">Register</div>
</div>
`;

const hooks = {
  before: async (params, state = {}) => {
    // console.log("Component beforeHook fired");
  },
  after: async (params, state = {}) => {
    // console.log("Component afterHook fired");
    document.getElementById("loginForm").addEventListener('submit', event => {
      event.preventDefault();
      const inputList = event.target.elements;
      store.auth.login(inputList.email.value, inputList.password.value);
    });
    document.getElementById("register").addEventListener('click', event => {
      window.router.navigate('/register');
    });
  }
};

export default {
  render,
  hooks
};