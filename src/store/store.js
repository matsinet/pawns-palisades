import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
// Make vue aware of vuex
Vue.use(Vuex)

// We create an object to hold the initial state when
// the app starts up
const state = {
    game: {
        title: 'jQuoridor',
        pawn_count: 2,
        turn: 'blue',
        powered_by: '',
    },
    players: {
        'red': {
            walls: 10,
            username: 'Bill',
            coords: {row: 9, col: 'e'},
        },
        'blue': {
            walls: 10,
            username: 'Ted',
            coords: {row: 1, col: 'e'}
        },
    },
    board: {
        1: {
            a: {move: null, pawn: null, wall: null},
            b: {move: null, pawn: null, wall: null},
            c: {move: null, pawn: null, wall: null},
            d: {move: 'blue', pawn: null, wall: null},
            e: {move: null, pawn: 'blue', wall: null},
            f: {move: 'blue', pawn: null, wall: null},
            g: {move: null, pawn: null, wall: null},
            h: {move: null, pawn: null, wall: null},
            i: {move: null, pawn: null, wall: null},
        },
        2: {
            a: {move: null, pawn: null, wall: null},
            b: {move: null, pawn: null, wall: null},
            c: {move: null, pawn: null, wall: null},
            d: {move: null, pawn: null, wall: null},
            e: {move: 'blue', pawn: null, wall: null},
            f: {move: null, pawn: null, wall: null},
            g: {move: null, pawn: null, wall: null},
            h: {move: null, pawn: null, wall: null},
            i: {move: null, pawn: null, wall: null},
        },
        3: {
            a: {move: null, pawn: null, wall: null},
            b: {move: null, pawn: null, wall: null},
            c: {move: null, pawn: null, wall: null},
            d: {move: null, pawn: null, wall: null},
            e: {move: null, pawn: null, wall: null},
            f: {move: null, pawn: null, wall: null},
            g: {move: null, pawn: null, wall: null},
            h: {move: null, pawn: null, wall: null},
            i: {move: null, pawn: null, wall: null},
        },
        4: {
            a: {move: null, pawn: null, wall: null},
            b: {move: null, pawn: null, wall: null},
            c: {move: null, pawn: null, wall: null},
            d: {move: null, pawn: null, wall: null},
            e: {move: null, pawn: null, wall: null},
            f: {move: null, pawn: null, wall: null},
            g: {move: null, pawn: null, wall: null},
            h: {move: null, pawn: null, wall: null},
            i: {move: null, pawn: null, wall: null},
        },
        5: {
            a: {move: null, pawn: null, wall: null},
            b: {move: null, pawn: null, wall: null},
            c: {move: null, pawn: null, wall: null},
            d: {move: null, pawn: null, wall: null},
            e: {move: null, pawn: null, wall: null},
            f: {move: null, pawn: null, wall: null},
            g: {move: null, pawn: null, wall: null},
            h: {move: null, pawn: null, wall: null},
            i: {move: null, pawn: null, wall: null},
        },
        6: {
            a: {move: null, pawn: null, wall: null},
            b: {move: null, pawn: null, wall: null},
            c: {move: null, pawn: null, wall: null},
            d: {move: null, pawn: null, wall: null},
            e: {move: null, pawn: null, wall: null},
            f: {move: null, pawn: null, wall: null},
            g: {move: null, pawn: null, wall: null},
            h: {move: null, pawn: null, wall: null},
            i: {move: null, pawn: null, wall: null},
        },
        7: {
            a: {move: null, pawn: null, wall: null},
            b: {move: null, pawn: null, wall: null},
            c: {move: null, pawn: null, wall: null},
            d: {move: null, pawn: null, wall: null},
            e: {move: null, pawn: null, wall: null},
            f: {move: null, pawn: null, wall: null},
            g: {move: null, pawn: null, wall: null},
            h: {move: null, pawn: null, wall: null},
            i: {move: null, pawn: null, wall: null},
        },
        8: {
            a: {move: null, pawn: null, wall: null},
            b: {move: null, pawn: null, wall: null},
            c: {move: null, pawn: null, wall: null},
            d: {move: null, pawn: null, wall: null},
            e: {move: null, pawn: null, wall: null},
            f: {move: null, pawn: null, wall: null},
            g: {move: null, pawn: null, wall: null},
            h: {move: null, pawn: null, wall: null},
            i: {move: null, pawn: null, wall: null},
        },
        9: {
            a: {move: null, pawn: null, wall: null},
            b: {move: null, pawn: null, wall: null},
            c: {move: null, pawn: null, wall: null},
            d: {move: null, pawn: null, wall: null},
            e: {move: null, pawn: 'red', wall: null},
            f: {move: null, pawn: null, wall: null},
            g: {move: null, pawn: null, wall: null},
            h: {move: null, pawn: null, wall: null},
            i: {move: null, pawn: null, wall: null},
        },
    }
}

// We combine the intial state and the mutations to create a vuex store.
// This store can be linked to our app.
export default new Vuex.Store({
    state,
    mutations,
    actions
})