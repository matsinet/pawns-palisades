/**
 * API Service Layer
 *
 * This module provides a centralized interface for all backend API calls.
 * Configure the API_BASE_URL to point to your backend server.
 */

// TODO: Update this to your actual backend API URL
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
}

/**
 * Lobby API endpoints
 */
export const lobbyApi = {
  /**
   * Create a new lobby
   * @param {string} playerName - Name of the player creating the lobby
   * @param {number} playerCount - Number of players (2 or 4)
   * @returns {Promise<{lobby: Object, player: Object}>}
   */
  createLobby: async (playerName, playerCount) => {
    return apiFetch('/lobbies', {
      method: 'POST',
      body: JSON.stringify({ playerName, playerCount }),
    });
  },

  /**
   * Join an existing lobby
   * @param {string} lobbyCode - The lobby code to join
   * @param {string} playerName - Name of the joining player
   * @returns {Promise<{lobby: Object, player: Object}>}
   */
  joinLobby: async (lobbyCode, playerName) => {
    return apiFetch(`/lobbies/${lobbyCode}/join`, {
      method: 'POST',
      body: JSON.stringify({ playerName }),
    });
  },

  /**
   * Quick match - find or create a match
   * @param {string} playerName - Name of the player
   * @returns {Promise<{lobby: Object, player: Object, isHost: boolean}>}
   */
  quickMatch: async (playerName) => {
    return apiFetch('/lobbies/quick-match', {
      method: 'POST',
      body: JSON.stringify({ playerName }),
    });
  },

  /**
   * Get lobby details
   * @param {string} lobbyCode - The lobby code
   * @returns {Promise<Object>} Lobby data
   */
  getLobby: async (lobbyCode) => {
    return apiFetch(`/lobbies/${lobbyCode}`);
  },

  /**
   * Update player ready status
   * @param {string} lobbyCode - The lobby code
   * @param {string} playerId - The player ID
   * @param {boolean} isReady - Ready status
   * @returns {Promise<Object>}
   */
  setPlayerReady: async (lobbyCode, playerId, isReady) => {
    return apiFetch(`/lobbies/${lobbyCode}/ready`, {
      method: 'POST',
      body: JSON.stringify({ playerId, isReady }),
    });
  },

  /**
   * Start the game (host only)
   * @param {string} lobbyCode - The lobby code
   * @param {string} playerId - The host player ID
   * @returns {Promise<{gameState: Object}>}
   */
  startGame: async (lobbyCode, playerId) => {
    return apiFetch(`/lobbies/${lobbyCode}/start`, {
      method: 'POST',
      body: JSON.stringify({ playerId }),
    });
  },

  /**
   * Leave a lobby
   * @param {string} lobbyCode - The lobby code
   * @param {string} playerId - The player ID
   * @returns {Promise<Object>}
   */
  leaveLobby: async (lobbyCode, playerId) => {
    return apiFetch(`/lobbies/${lobbyCode}/leave`, {
      method: 'POST',
      body: JSON.stringify({ playerId }),
    });
  },
};

/**
 * Game API endpoints
 */
export const gameApi = {
  /**
   * Send game state update to server
   * @param {string} gameId - The game ID
   * @param {Object} gameState - The current game state
   * @returns {Promise<Object>}
   */
  updateGameState: async (gameId, gameState) => {
    return apiFetch(`/games/${gameId}/state`, {
      method: 'PUT',
      body: JSON.stringify({ gameState }),
    });
  },

  /**
   * Get current game state from server
   * @param {string} gameId - The game ID
   * @returns {Promise<Object>} Game state
   */
  getGameState: async (gameId) => {
    return apiFetch(`/games/${gameId}/state`);
  },

  /**
   * Submit a move
   * @param {string} gameId - The game ID
   * @param {Object} move - Move data (type: 'pawn' | 'wall', details: {...})
   * @returns {Promise<Object>} Updated game state
   */
  submitMove: async (gameId, move) => {
    return apiFetch(`/games/${gameId}/move`, {
      method: 'POST',
      body: JSON.stringify({ move }),
    });
  },

  /**
   * End the game
   * @param {string} gameId - The game ID
   * @param {number} winnerId - The winner player ID
   * @returns {Promise<Object>}
   */
  endGame: async (gameId, winnerId) => {
    return apiFetch(`/games/${gameId}/end`, {
      method: 'POST',
      body: JSON.stringify({ winnerId }),
    });
  },
};

/**
 * Mock API for development/testing
 * These functions simulate API responses without a backend
 */
export const mockApi = {
  lobbies: new Map(),
  games: new Map(),

  generateCode: () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  },

  createLobby: async (playerName, playerCount) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    const lobbyCode = mockApi.generateCode();
    const playerId = `player_${Date.now()}`;

    const lobby = {
      id: lobbyCode,
      code: lobbyCode,
      hostId: playerId,
      playerCount,
      players: [{
        id: playerId,
        name: playerName,
        isReady: false
      }],
      status: 'waiting',
      createdAt: new Date().toISOString()
    };

    mockApi.lobbies.set(lobbyCode, lobby);

    return {
      lobby,
      player: lobby.players[0]
    };
  },

  joinLobby: async (lobbyCode, playerName) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const lobby = mockApi.lobbies.get(lobbyCode);
    if (!lobby) throw new Error('Lobby not found');
    if (lobby.players.length >= lobby.playerCount) throw new Error('Lobby is full');

    const playerId = `player_${Date.now()}`;
    const player = {
      id: playerId,
      name: playerName,
      isReady: false
    };

    lobby.players.push(player);
    mockApi.lobbies.set(lobbyCode, lobby);

    return { lobby, player };
  },

  getLobby: async (lobbyCode) => {
    await new Promise(resolve => setTimeout(resolve, 200));

    const lobby = mockApi.lobbies.get(lobbyCode);
    if (!lobby) throw new Error('Lobby not found');

    return lobby;
  },

  setPlayerReady: async (lobbyCode, playerId, isReady) => {
    await new Promise(resolve => setTimeout(resolve, 200));

    const lobby = mockApi.lobbies.get(lobbyCode);
    if (!lobby) throw new Error('Lobby not found');

    const player = lobby.players.find(p => p.id === playerId);
    if (player) {
      player.isReady = isReady;
      mockApi.lobbies.set(lobbyCode, lobby);
    }

    return { success: true };
  },

  startGame: async (lobbyCode, playerId) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const lobby = mockApi.lobbies.get(lobbyCode);
    if (!lobby) throw new Error('Lobby not found');
    if (lobby.hostId !== playerId) throw new Error('Only host can start game');

    lobby.status = 'in-progress';
    mockApi.lobbies.set(lobbyCode, lobby);

    return {
      gameState: null // Will use default game state
    };
  },

  leaveLobby: async (lobbyCode, playerId) => {
    await new Promise(resolve => setTimeout(resolve, 200));

    const lobby = mockApi.lobbies.get(lobbyCode);
    if (!lobby) return { success: true };

    lobby.players = lobby.players.filter(p => p.id !== playerId);

    if (lobby.players.length === 0) {
      mockApi.lobbies.delete(lobbyCode);
    } else if (lobby.hostId === playerId) {
      lobby.hostId = lobby.players[0].id;
    }

    mockApi.lobbies.set(lobbyCode, lobby);
    return { success: true };
  }
};

// Export either real API or mock API based on environment
export default {
  lobby: process.env.USE_MOCK_API ? mockApi : lobbyApi,
  game: gameApi
};
