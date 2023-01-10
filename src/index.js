import * as components from "./components";
import * as store from "./store";
import * as views from "./views";
import Navigo from "navigo";
import { merge, camelCase, upperFirst, isEmpty } from "lodash";
import BulmaTagsInput from '@creativebulma/bulma-tagsinput';
import { isJwtExpired } from 'jwt-check-expiration';
import "./assets/css/styles.scss";

const router = new Navigo("/");

function render(viewName) {
  
  let view = views[viewName];
  let state = store[viewName];
  
  if (! (viewName in views)) {
    console.warn("View not found displaying 404 page");
    view = views.pageNotFound;
    state = merge(store.global, store.home);
  }
  
  document.title = state.tabTitle || store.global.tabTitle;

  document.querySelector("#root").innerHTML = `${components.main(view, state)}`;

  router.updatePageLinks();
}

function getViewNameFromParams(params) {
  let viewName = "home";
  let actionName = '';
  
  const actions = ['create', 'edit'];
  
  if (params?.data?.view) {
    viewName = camelCase(params.data.view);
  }

  if (params?.data?.id && !params?.data?.action) {
    
    if (actions.includes(params.data.id)) {
      actionName = params.data.id;
    } else {
      actionName = 'detail';
    }
    
    viewName += upperFirst(camelCase(actionName));

  }
  
  if (params?.data?.subView) {
    viewName = camelCase(params.data.subView);
  }
  
  if (params?.data?.subId && !params?.data?.action) {
    
    actionName = 'detail';

    if (actions.includes(params.data.subId)) {
      actionName = params.data.subId;
    } else {
      actionName = 'detail';
    }
    
    viewName += upperFirst(camelCase(actionName));
  }
  
  if (params?.data?.action) {
    viewName += upperFirst(camelCase(params.data.action));
  }
  
  return viewName;
}

function pageNotFound() {
  // This should render a 404 page instead of home
  render('');
}
  
router.hooks({
  before: async (done, params) => {
    // if (!store.auth.token && isEmpty(store.auth.user)) {
    //   store.auth.token = sessionStorage.getItem('token');
    //   store.auth.user = JSON.parse(sessionStorage.getItem('user'));
    // }
    
    let viewName = getViewNameFromParams(params);
    
    if ((! (viewName in views))) {
      console.warn("View not found exiting beforeHook");
      done();
      return;
    }
    
    // if (store.auth.token) {
    //   console.log('isJwtExpired(store.auth.token):', isJwtExpired(store.auth.token));
    // }
    
    // if (store[viewName].requireAuth && (!store.auth.token || isJwtExpired(store.auth.token))) {
    //   store.login.logout();
    // }
    
    // TODO: Add spinner to beforeHook processing
    if ('hooks' in views[viewName] && 'before' in views[viewName].hooks) {
      const viewData = await views[viewName].hooks.before(params, store[viewName]);
      if (viewData) {
        const state = store[viewName];
        merge(state, viewData);
        store[viewName] = state;
      }
    } else {
      console.log("No component beforeHook found!");
    }

    for (const key in components) {
      const component = components[key];
      if('hooks' in component) {
        await component.hooks.before(params, store[viewName]);
      }
    }
    done();
  },
  after: (params) => {
    let viewName = getViewNameFromParams(params);

    if (! (viewName in views)) {
      return;
    }

    if ('hooks' in views[viewName] && 'after' in views[viewName].hooks) {
      const viewData = views[viewName].hooks.after(params, store[viewName]);
    } else {
      console.log("No component afterHook found!");
    }

    for (const key in components) {
      const component = components[key];
      if('hooks' in component) {
        component.hooks.after(params, store[viewName]);
      }
    }
    
    // BulmaTagsInput.attach();
  },
  already: async (params) => {
    let viewName = getViewNameFromParams(params);
    
    // TODO: Add spinner to beforeHook processing
    if ('hooks' in views[viewName] && 'before' in views[viewName].hooks) {
      const viewData = await views[viewName].hooks.before(params, store[viewName]);
      if (viewData) {
        const state = store[viewName];
        merge(state, viewData);
        store[viewName] = state;
      }
    } else {
      console.log("No component afterHook found!");
    }

    for (const key in components) {
      const component = components[key];
      if('hooks' in component) {
        await component.hooks.before(params, store[viewName]);
      }
    }

    render(viewName);
  }
});

router.notFound(
  () => {
    console.warn("Not Found route being hit");
    pageNotFound();
  }
);

// Is this a good idea??? I don't think so!
window.router = router;
window.store = store;

router
  .on({
    "/": () => render('home'),
    "/:view": params => render(getViewNameFromParams(params)),
    "/:view/:id": params => render(getViewNameFromParams(params)),
    "/:view/:id/:action": params => render(getViewNameFromParams(params)),
    "/:view/:id/:subView/:subId": params => render(getViewNameFromParams(params)),
    "/:view/:id/:subView/:subId/:action": params => render(getViewNameFromParams(params))
  })
  .resolve();
