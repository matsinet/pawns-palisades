import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
// Make vue aware of vuex
Vue.use(Vuex)

// We create an object to hold the initial state when
// the app starts up
const state = {
    game: {
        title: 'jQuoridor',
        pawn_count: 4,
        turn: 'red',
        powered_by: '',
    },
    players: {
        'red': {
            walls: 10,
            username: 'Bill',
        },
        'blue': {
            walls: 10,
            username: 'Ted',
        },
    }
}

// Create an object storing various mutations. We will write the mutation
const mutations = {
    // TODO: set up our mutations
    NEXT_PLAYER (state) {
        switch(state.game.turn) {
            case 'red':
                this.SET_TURN(state, 'blue');
                break;
            case 'blue':
                if(state.game.pawn_count == 2) {
                    this.SET_TURN(state, 'red');
                } else {
                    this.SET_TURN(state, 'yellow');
                }
                break;
            case 'yellow':
                this.SET_TURN(state, 'green');
                break;
            case 'green':
                this.SET_TURN(state, 'red');
                break;
        }
    },
    SET_TURN (state, player) {
        state.game.turn = player;
    },
    DECREMENT_WALL_COUNT (state, player) {
        state.players[player].walls-- 
    },
    SET_PLAYER_COUNT (state, player_count) {
        if(player_count == 4) {
            state.players.yellow = {
                    walls: 5,
                    username: '',
                }
            state.players.green = {
                    walls: 5,
                    username: '',
                }
            
            this.SET_PAWN_COUNT(state, 5)
        } else {
            delete state.players.yellow
            delete state.players.green
            
            this.SET_PAWN_COUNT(state, 10)
        }
    },
    SET_PAWN_COUNT (state, pawn_count) {
        for(var player in state.players) {
            state.players[player].walls = pawn_count
        }
    }
}

// We combine the intial state and the mutations to create a vuex store.
// This store can be linked to our app.
export default new Vuex.Store({
    state,
    mutations,
    actions
})