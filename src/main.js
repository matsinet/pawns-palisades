import Vue from 'vue'
import Vuex from 'vuex'
import store from './store/store'
import App from './App'

// important, teaches Vue components how to
// handle Vuex-related options
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
    el: 'body',
    store,
    components: {
        App
    }
})
