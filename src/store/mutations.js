export const SET_TURN = function(state, player) {
    state.game.turn = player;
};

export const DECREMENT_WALL_COUNT = function(state, player) {
    state.players[player].walls -= 1; 
};
    
export const MOVE_PLAYER = function(state, coords) {
    for(let r = 1; r < 10; r++) {
        for(let c = 97; c < 106; c++) {
            let column = String.fromCharCode(c);
            
            if(state.board[r][column].pawn == state.game.turn) {
                state.board[r][column].pawn = null;
            }
        }
    }
    state.board[coords.row][coords.col].pawn = state.game.turn;
    state.players[state.game.turn].coords = coords;
};

export const HIDE_MOVES = function(state) {
    for(let r = 1; r < 10; r++) {
        for(let c = 97; c < 106; c++) {
            let column = String.fromCharCode(c);
            state.board[r][column].move = null;
        }
    }
};

export const DRAW_MOVES = function(state) {
    let coords = state.players[state.game.turn].coords;
    
    let row = coords.row;
    let col = coords.col;
    let colCode = coords.col.charCodeAt(0);
    
     // draw down
    if((row - 1) > 0) {
        let down = state.board[row - 1][col];
        console.log(down);
        if(down.pawn == null && down.wall != 'h') {
            console.log(down.wall);
            down.move = state.game.turn;
        } else if((row - 2) > 0) {
            state.board[row - 2][col].move = state.game.turn;
        }
    }
    // draw up
    if((row + 1) < 10) {
        let up = state.board[row + 1][col];
        console.log(up);
        if(up.pawn == null && up.wall != 'h') {
            up.move = state.game.turn;
        } else if((row + 2) < 10) {
            state.board[row + 2][col].move = state.game.turn;
        }
    }
    // draw left
    if((colCode - 1) > 96) {
        let left = state.board[row][String.fromCharCode(colCode - 1)];
        console.log(left);
        if(left.pawn == null && left.pawn != 'v') {
            left.move = state.game.turn;
        } else if ((colCode - 2) > 96){
            state.board[row][String.fromCharCode(colCode - 2)].move = state.game.turn;
        }
    }
    // draw right
    if((colCode + 1) < 106) {
        let right = state.board[row][String.fromCharCode(colCode + 1)];
        console.log(right);
        if(right.pawn == null && right.pawn != 'v') {
            right.move = state.game.turn;
        } else if((colCode + 2) < 106){
            state.board[row][String.fromCharCode(colCode + 2)].move = state.game.turn;
        }
    }
};

export const SET_PLAYER_COUNT = function(state, player_count) {
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
};

export const UPDATE_MOVE_COORDS = function(state, coords) {
    state.move.coords = coords;
};

export const PLACE_WALL = function(state, orientation) {
    state.board[state.move.coords.row][state.move.coords.col].wall = orientation;
    DECREMENT_WALL_COUNT(state, state.game.turn);
};

export const SET_PAWN_COUNT = function(state, pawn_count) {
    for(var player in state.players) {
        state.players[player].walls = pawn_count
    }
};