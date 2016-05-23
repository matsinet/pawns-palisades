import Vue from 'vue';
import Vuex from 'vuex';
import VueMdl from 'vue-mdl';
import store from './store/store';
import App from './App';

// important, teaches Vue components how to
// handle Vuex-related options
Vue.use(Vuex);

// handle VueMdl options
Vue.use(VueMdl);

/* eslint-disable no-new */
new Vue({
    el: 'body',
    store,
    components: {
        App,
    }
});
