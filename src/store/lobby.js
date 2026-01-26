export default {
  tabTitle: "Game Lobby",
  header: "Game Lobby",
  view: "lobby",
  currentLobby: {
    id: null,
    code: null,
    hostId: null,
    playerCount: 2, // 2 or 4
    players: [],
    status: 'waiting', // 'waiting', 'ready', 'in-progress', 'completed'
    createdAt: null
  },
  currentPlayer: {
    id: null,
    name: null,
    isHost: false,
    isReady: false
  },

  // Create a new lobby
  createLobby: function(playerName, playerCount = 2) {
    // This will call the backend API
    return {
      playerName,
      playerCount
    };
  },

  // Join an existing lobby
  joinLobby: function(lobbyCode, playerName) {
    // This will call the backend API
    return {
      lobbyCode,
      playerName
    };
  },

  // Update player ready status
  setPlayerReady: function(playerId, isReady) {
    const player = this.currentLobby.players.find(p => p.id === playerId);
    if (player) {
      player.isReady = isReady;
    }
  },

  // Check if all players are ready
  allPlayersReady: function() {
    if (this.currentLobby.players.length < 2) return false;
    return this.currentLobby.players.every(p => p.isReady);
  },

  // Check if lobby is full
  isLobbyFull: function() {
    return this.currentLobby.players.length >= this.currentLobby.playerCount;
  },

  // Update lobby from server data
  updateLobby: function(lobbyData) {
    this.currentLobby = {
      ...this.currentLobby,
      ...lobbyData
    };
  },

  // Set current player data
  setCurrentPlayer: function(playerData) {
    this.currentPlayer = {
      ...this.currentPlayer,
      ...playerData
    };
  },

  // Reset lobby state
  resetLobby: function() {
    this.currentLobby = {
      id: null,
      code: null,
      hostId: null,
      playerCount: 2,
      players: [],
      status: 'waiting',
      createdAt: null
    };
    this.currentPlayer = {
      id: null,
      name: null,
      isHost: false,
      isReady: false
    };
  },

  // Get player color assignment
  getPlayerColor: function(playerIndex) {
    const colors = ['blue', 'red', 'yellow', 'green'];
    return colors[playerIndex] || 'blue';
  },

  // Convert lobby players to game players
  getLobbyPlayersForGame: function() {
    return this.currentLobby.players.map((player, index) => ({
      id: index + 1,
      walls: this.currentLobby.playerCount === 4 ? 5 : 10,
      color: this.getPlayerColor(index),
      name: player.name,
      lobbyPlayerId: player.id
    }));
  }
};
