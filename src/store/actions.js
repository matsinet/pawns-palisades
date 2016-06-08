// An action will receive the store as the first argument.
// Since we are only interested in the dispatch (and optionally the state)
// we can pull those two parameters using the ES6 destructuring feature
export const setTurn = function({ dispatch }, e) {
    dispatch('SET_TURN', e.target.value);
}

export const movePlayer = function({dispatch, state}, coords) {
    // move the current player to the selected position
    dispatch('MOVE_PLAYER', coords);    
}

export const hideMoves = function({dispatch, state}) {
    // move the current player to the selected position
    dispatch('HIDE_MOVES');    
}

export const nextPlayer = function({dispatch, state}) {
    dispatch('HIDE_MOVES');
    // change the turn to the next player
    switch(state.game.turn) {
        case 'red':
            dispatch('SET_TURN', 'blue');
            break;
        case 'blue':
            if(state.game.pawn_count == 2) {
                dispatch('SET_TURN', 'red');
            } else {
                dispatch('SET_TURN', 'orange');
            }
            break;
        case 'orange':
            dispatch('SET_TURN', 'green');
            break;
        case 'green':
            dispatch('SET_TURN', 'red');
            break;
    }
    
    // draw the next player's move options
    dispatch('DRAW_MOVES');
}
    
export const drawMoves = function({dispatch, state}) {
    // draw the next player's move options
    dispatch('DRAW_MOVES');
}

export const updateMoveCoords = function({dispatch, state}, coords) {
    dispatch('UPDATE_MOVE_COORDS', coords);
}

export const placeWall = function({dispatch, state}, orientation) {
    dispatch('PLACE_WALL', orientation);
}