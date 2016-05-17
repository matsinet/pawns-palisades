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

// Create an object storing various mutations. We will write the mutation
const mutations = {
    SET_TURN (state, player) {
        state.game.turn = player;
    },
    DECREMENT_WALL_COUNT (state, player) {
        state.players[player].walls -= 1; 
    },
    MOVE_PLAYER (state, coords) {
        for(let r = 1; r < 10; r++) {
            // console.log(r);
            for(let c = 97; c < 106; c++) {
                let column = String.fromCharCode(c);
                // console.log(column);
                state.board[r][column].move = null;
                
                if(state.board[r][column].pawn == state.game.turn) {
                    state.board[r][column].pawn = null;
                }
            }
        }
        state.board[coords.row][coords.col].pawn = state.game.turn;
        state.players[state.game.turn].coords = coords;
    },
    DRAW_MOVES (state) {
        let coords = state.players[state.game.turn].coords;
        
        let row = coords.row;
        let col = coords.col;
        let colCode = coords.col.charCodeAt(0);
        
        // draw up
        if((row + 1) < 10) {
            state.board[row + 1][col].move = state.game.turn;
        }
        // draw down
        if((row - 1) > 0) {
            state.board[row - 1][col].move = state.game.turn;
        }
        // draw left
        if((colCode - 1) > 97) {
            state.board[row][String.fromCharCode(colCode - 1)].move = state.game.turn;
        }
        // draw right
        if((colCode + 1) < 106) {
            console.log(String.fromCharCode(colCode + 1));
            state.board[row][String.fromCharCode(colCode + 1)].move = state.game.turn;
        }
    },
    SET_PLAYER_COUNT (state, player_count) {
        if(player_count == 4) {
            state.players.orange = {
                    walls: 5,
                    username: '',
                }
            state.players.green = {
                    walls: 5,
                    username: '',
                }
            
            this.SET_PAWN_COUNT(state, 5)
        } else {
            delete state.players.orange
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