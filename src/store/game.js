export default {
    tabTitle: "Current Game",
    header: "Current Game",
    view: "game",
    currentState: {
      players: 2,
      blue: {
        pawn: [1, 'e'],
        walls: 10,
        winningSide: 9
      },
      red: {
        pawn: [9, 'e'],
        walls: 10,
        winningSide: 1
      },
      green: {
        pawn: [5, 'i'],
        walls: 5,
        winningSide: 'a'
      },
      yellow: {
        pawn: [5, 'a'],
        walls: 5,
        winningSide: 'i'
      },
      walls: [],
      turn: 'blue',
      complete: false
    }
  };