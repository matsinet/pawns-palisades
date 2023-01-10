import html from 'html-literal';
import '../assets/css/components/sidebar.scss';

const render = (state = {}) => html`<aside class="menu m-4">
    <p class="menu-label mb-0">Game</p>
    <ul class="menu-list">
      <li><a href="/lobby" class="active" data-navigo>Lobby</a></li>
      <li><a href="/game" data-navigo>Current Game</a></li>
    </ul>
    <p class="menu-label mb-0">Admin</p>
    <ul class="menu-list">
      <li><a href="/users" data-navigo>Users</a></li>
    </ul>
    <p class="menu-label mb-0">Info</p>
    <ul class="menu-list">
      <li><a href="/about-us" data-navigo>About Us</a></li>
    </ul>
  </aside>`;

const oldRender = (state = {}) => html`
  <aside class="menu">
    <!--<ul class="menu-list" v-if="userStore.isUserAuthenticated">-->
    <ul class="menu-list">
      <li class="menu-label">Shop</li>
      <!--<li class="menu-label" v-if="hasPermission('isAuthenticated')">Shop</li>-->
        <!--<router-link :to="'customers'" active-class="active" v-if="hasPermission('isAuthenticated')">-->
      <li class="menu-link" active-class="active"><a href="/customers" data-navigo>Customers</a></li>
      <!--<router-link :to="'/vehicles'" active-class="active">-->
        <!--<router-link :to="'vehicles'" active-class="active" v-if="hasPermission('isAuthenticated')">-->
        <!--<li class="menu-link">Vehicles</li>-->
      <!--</router-link>-->
      <!--<router-link :to="'/work-orders'" active-class="active">-->
        <!--<router-link :to="'work-orders'" active-class="active" v-if="hasPermission('isAuthenticated')">-->
        <!--<li class="menu-link">Work Orders</li>-->
      <!--</router-link>-->
      <!--<router-link :to="'/line-items'" active-class="active">-->
        <!--<router-link :to="'line-items'" active-class="active" v-if="hasPermission('isAuthenticated')">-->
        <!--<li class="menu-link">Inventory</li>-->
      <!--</router-link>-->
    </ul>
    <!--<ul class="menu-list" v-if="hasPermission('systemAdmin') || hasPermission('shopOwner')">-->
    <ul class="menu-list">
      <li class="menu-label">Admin</li>
      <!--<li class="menu-label" v-if="hasPermission('systemAdmin')">Admin</li>-->
      <!--<router-link :to="'/users'" active-class="active">-->
        <!--<router-link :to="'users'" active-class="active" v-if="hasPermission('systemAdmin')">-->
        <!--<li class="menu-link">Users</li>-->
      <!--</router-link>-->
      <!--<li class="menu-link"  *ngIf="hasPermission('users')" routerLink="/users" routerLinkActive="active">Users</li>-->
      <!--<li class="menu-link"  *ngIf="hasPermission('companies')" routerLink="/companies" routerLinkActive="active">Companies</li>-->
      <!--<li class="menu-link" routerLink="/tags" routerLinkActive="active">Tags</li>-->
      <!--<li><div class="divider"></div></li>-->
      <!--<li class="menu-label">Transactions</li>-->
      <!--<li class="menu-link" routerLink="/transactions/payments" routerLinkActive="active">Payments</li>-->
      <!--<li class="menu-link" routerLink="/transactions/warranty" routerLinkActive="active">Warranty</li>-->
    </ul>
    <ul class="menu-list">
      <li class="menu-label">Info</li>
      <li class="menu-link" active-class="active"><a href="/about-us" data-navigo>About Us</a></li>
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