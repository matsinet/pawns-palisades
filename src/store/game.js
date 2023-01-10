export default {
    tabTitle: "Current Game",
    header: "Current Game",
    view: "game",
    currentState: {
      players: 2,
      blue: {
        pawn: [1, 'e'],
        walls: self.players === 2 ? 10 : 5,
        winningSide: 9
      },
      red: {
        pawn: [9, 'e'],
        walls: self.players === 2 ? 10 : 5,
        winningSide: 1
      },
      green: {
        pawn: [5, 'a'],
        walls: 5,
        winningSide: 'i'
      },
      yellow: {
        pawn: [5, 'i'],
        walls: 5,
        winningSide: 'a'
      },
      walls: [],
      turn: 'blue',
      complete: false
    }
  };