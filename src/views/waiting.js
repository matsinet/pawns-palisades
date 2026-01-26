import html from "html-literal";
import "../assets/css/views/lobbyWaiting.scss";
import { mockApi } from "../services/api";

const render = (state = {}) => {
  const { currentLobby, currentPlayer } = state;
  const canStartGame = currentPlayer.isHost &&
                       currentLobby.players.length >= 2 &&
                       state.allPlayersReady();

  const playerSlots = Array.from({ length: currentLobby.playerCount }, (_, i) => {
    const player = currentLobby.players[i];
    const colorClass = player ? state.getPlayerColor(i) : '';

    if (player) {
      return html`
        <div class="player-slot filled ${colorClass}">
          <div class="player-avatar ${colorClass}">
            ${player.name.charAt(0).toUpperCase()}
          </div>
          <div class="player-info">
            <div class="player-name">
              ${player.name}
              ${player.id === currentLobby.hostId ? '<span class="host-badge">HOST</span>' : ''}
            </div>
            <div class="player-status ${player.isReady ? 'ready' : 'not-ready'}">
              ${player.isReady ? '✓ Ready' : 'Not Ready'}
            </div>
          </div>
        </div>
      `;
    } else {
      return html`
        <div class="player-slot empty">
          <div class="player-avatar empty-avatar">?</div>
          <div class="player-info">
            <div class="player-name">Waiting for player...</div>
          </div>
        </div>
      `;
    }
  }).join('');

  return html`
    <div class="lobby-waiting">
      <div class="lobby-waiting-container">
        <div class="lobby-header">
          <h1>Game Lobby</h1>
          <div class="lobby-code-display">
            <span class="label">Lobby Code:</span>
            <span class="code">${currentLobby.code || 'LOADING'}</span>
            <button id="copy-code-btn" class="copy-btn" title="Copy to clipboard">
              📋
            </button>
          </div>
        </div>

        <div class="lobby-content">
          <div class="players-section">
            <h2>Players (${currentLobby.players.length}/${currentLobby.playerCount})</h2>
            <div class="player-grid">
              ${playerSlots}
            </div>
          </div>

          <div class="lobby-controls">
            ${!currentPlayer.isHost ? html`
              <button
                id="ready-toggle-btn"
                class="btn ${currentPlayer.isReady ? 'btn-danger' : 'btn-success'}"
              >
                ${currentPlayer.isReady ? 'Not Ready' : 'Ready'}
              </button>
            ` : ''}

            ${currentPlayer.isHost ? html`
              <button
                id="start-game-btn"
                class="btn btn-primary"
                ${!canStartGame ? 'disabled' : ''}
              >
                ${canStartGame ? 'Start Game' : 'Waiting for players...'}
              </button>
              <p class="start-hint">
                ${currentLobby.players.length < 2
                  ? 'Need at least 2 players to start'
                  : !state.allPlayersReady()
                    ? 'All players must be ready'
                    : 'Ready to start!'}
              </p>
            ` : html`
              <p class="waiting-message">Waiting for host to start the game...</p>
            `}

            <button id="leave-lobby-btn" class="btn btn-secondary">
              Leave Lobby
            </button>
          </div>
        </div>

        <div class="lobby-footer">
          <p>Share the lobby code with your friends to invite them!</p>
        </div>
      </div>
    </div>
  `;
}

const hooks = {
  before: async (params, state = {}) => {
    const lobbyCode = params.data.id;

    // If we don't have lobby data, fetch it
    if (!state.currentLobby.code || state.currentLobby.code !== lobbyCode) {
      try {
        const lobbyData = await mockApi.getLobby(lobbyCode);
        state.updateLobby(lobbyData);
      } catch (error) {
        console.error('Failed to fetch lobby:', error);
        router.navigate('/lobby');
        return;
      }
    }
  },
  after: async (params, state = {}) => {
    const lobbyCode = params.data.id;
    let pollingInterval;

    // Copy lobby code button
    const copyBtn = document.getElementById('copy-code-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(state.currentLobby.code);
        copyBtn.textContent = '✓';
        setTimeout(() => {
          copyBtn.textContent = '📋';
        }, 2000);
      });
    }

    // Ready toggle button (for non-host players)
    const readyBtn = document.getElementById('ready-toggle-btn');
    if (readyBtn) {
      readyBtn.addEventListener('click', async () => {
        const newReadyState = !state.currentPlayer.isReady;

        try {
          await mockApi.setPlayerReady(lobbyCode, state.currentPlayer.id, newReadyState);

          state.currentPlayer.isReady = newReadyState;
          state.setPlayerReady(state.currentPlayer.id, newReadyState);

          // Refresh the view
          router.navigate(`/lobby/${lobbyCode}`);
        } catch (error) {
          console.error('Failed to update ready status:', error);
          alert('Failed to update ready status. Please try again.');
        }
      });
    }

    // Start game button (for host)
    const startBtn = document.getElementById('start-game-btn');
    if (startBtn) {
      startBtn.addEventListener('click', async () => {
        try {
          const gameData = await mockApi.startGame(lobbyCode, state.currentPlayer.id);

          // Initialize game state with lobby players
          store.game.currentState.players = state.getLobbyPlayersForGame();
          store.game.currentState.playerCount = state.currentLobby.playerCount;
          store.game.currentState.complete = false;
          store.game.currentState.winner = null;

          // If game state is provided by backend, use it
          if (gameData.gameState) {
            store.game.currentState = {
              ...store.game.currentState,
              ...gameData.gameState
            };
          }

          // Navigate to game
          router.navigate('/game');
        } catch (error) {
          console.error('Failed to start game:', error);
          alert('Failed to start game. Please try again.');
        }
      });
    }

    // Leave lobby button
    const leaveBtn = document.getElementById('leave-lobby-btn');
    if (leaveBtn) {
      leaveBtn.addEventListener('click', async () => {
        try {
          await mockApi.leaveLobby(lobbyCode, state.currentPlayer.id);

          state.resetLobby();
          router.navigate('/lobby');
        } catch (error) {
          console.error('Failed to leave lobby:', error);
          state.resetLobby();
          router.navigate('/lobby');
        }
      });
    }

    // Poll for lobby updates every 2 seconds
    pollingInterval = setInterval(async () => {
      try {
        const lobbyData = await mockApi.getLobby(lobbyCode);
        const oldPlayerCount = state.currentLobby.players.length;
        const newPlayerCount = lobbyData.players.length;

        state.updateLobby(lobbyData);

        // Refresh view if players changed or game started
        if (oldPlayerCount !== newPlayerCount || lobbyData.status === 'in-progress') {
          if (lobbyData.status === 'in-progress') {
            clearInterval(pollingInterval);
            // Initialize game and navigate
            store.game.currentState.players = state.getLobbyPlayersForGame();
            store.game.currentState.playerCount = state.currentLobby.playerCount;
            router.navigate('/game');
          } else {
            router.navigate(`/lobby/${lobbyCode}`);
          }
        }
      } catch (error) {
        if (error.message === 'Lobby not found') {
          clearInterval(pollingInterval);
          alert('Lobby no longer exists');
          router.navigate('/lobby');
        } else {
          console.error('Failed to poll lobby:', error);
        }
      }
    }, 2000);

    // Cleanup polling on navigation
    window.addEventListener('beforeunload', () => {
      clearInterval(pollingInterval);
    });
  }
};

export default {
  render,
  hooks
};
