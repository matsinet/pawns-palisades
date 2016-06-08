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
    move: {
        coords: {},
        orientation: 'h',
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
            a: {move: null, pawn: null},
            b: {move: null, pawn: null},
            c: {move: null, pawn: null},
            d: {move: 'blue', pawn: null},
            e: {move: null, pawn: 'blue'},
            f: {move: 'blue', pawn: null},
            g: {move: null, pawn: null},
            h: {move: null, pawn: null},
            i: {move: null, pawn: null},
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
            i: {move: null, pawn: null},
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
            i: {move: null, pawn: null},
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
            i: {move: null, pawn: null},
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
            i: {move: null, pawn: null},
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
            i: {move: null, pawn: null},
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
            i: {move: null, pawn: null},
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
            i: {move: null, pawn: null},
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
            i: {move: null, pawn: null},
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