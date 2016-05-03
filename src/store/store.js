import Vue from 'vue'
import Vuex from 'vuex'

// Make vue aware of vuex
Vue.use(Vuex)

// We create an object to hold the initial state when
// the app starts up
const state = {
    game: {
        title: 'jQuoridor',
        pawn_count: 2,
        turn: 'green',
        powered_by: ''
    },
    players: {
        'green': {
            walls: 10,
            username: 'Bill',
        },
        'blue': {
            walls: 10,
            username: 'Ted',
        },
        'yellow': {
            walls: 5,
            username: 'Eddie',
        },
        'red': {
            walls: 5,
            username: 'Sammy',
        },
    }
}

// Create an object storing various mutations. We will write the mutation
const mutations = {
    // TODO: set up our mutations
    NEXT_PLAYER: function(state) {
        switch(state.game.turn) {
            case 'green':
                this.set_turn(state, 'blue')
                break
            case 'blue':
                if(state.game.pawn_count == 2) {
                    this.set_turn(state, 'green')
                } else {
                    this.set_turn(state, 'yellow')
                }
                break
            case 'yellow':
                this.set_turn(state, 'red')
                break
            case 'red':
                this.set_turn(state, 'green')
                break
        }
    },
    SET_TURN: function(state, player) {
        state.game.turn = player;
    },
    DECREMENT_WALL_COUNT: function(state, player) {
        state.players[player].walls-- 
    },
    SET_PAWN_COUNT: function (state, pawn_count) {
        if(pawn_count == 4) {
            for(var player in state.players) {
                state.players[player].walls = 5
            }
        }
    }
}

// We combine the intial state and the mutations to create a vuex store.
// This store can be linked to our app.
export default new Vuex.Store({
    state,
    mutations
})