// An action will receive the store as the first argument.
// Since we are only interested in the dispatch (and optionally the state)
// we can pull those two parameters using the ES6 destructuring feature
export const setTurn = function({ dispatch }, e) {
    dispatch('SET_TURN', e.target.value);
}

export const nextPlayer = function({dispatch, state}, element, coords) {
    console.log(element);
    
    // move the current player to the selected position
    dispatch('MOVE_PLAYER', coords);
    
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