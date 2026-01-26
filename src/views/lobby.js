import html from "html-literal";
import "../assets/css/views/lobbyHome.scss";
import { mockApi } from "../services/api";

const render = (state = {}) => {
  return html`
    <div class="lobby-home">
      <div class="lobby-container">
        <h1>Welcome to Pawns & Palisades</h1>

        <div class="lobby-options">
          <!-- Create Lobby Section -->
          <div class="lobby-card">
            <h2>Create New Game</h2>
            <form id="create-lobby-form">
              <div class="form-group">
                <label for="player-name-create">Your Name</label>
                <input
                  type="text"
                  id="player-name-create"
                  name="playerName"
                  placeholder="Enter your name"
                  required
                  maxlength="20"
                />
              </div>

              <div class="form-group">
                <label>Number of Players</label>
                <div class="player-count-options">
                  <label class="radio-option">
                    <input type="radio" name="playerCount" value="2" checked />
                    <span>2 Players</span>
                  </label>
                  <label class="radio-option">
                    <input type="radio" name="playerCount" value="4" />
                    <span>4 Players</span>
                  </label>
                </div>
              </div>

              <button type="submit" class="btn btn-primary">
                Create Lobby
              </button>
            </form>
          </div>

          <div class="divider">
            <span>OR</span>
          </div>

          <!-- Join Lobby Section -->
          <div class="lobby-card">
            <h2>Join Existing Game</h2>
            <form id="join-lobby-form">
              <div class="form-group">
                <label for="player-name-join">Your Name</label>
                <input
                  type="text"
                  id="player-name-join"
                  name="playerName"
                  placeholder="Enter your name"
                  required
                  maxlength="20"
                />
              </div>

              <div class="form-group">
                <label for="lobby-code">Lobby Code</label>
                <input
                  type="text"
                  id="lobby-code"
                  name="lobbyCode"
                  placeholder="Enter lobby code"
                  required
                  maxlength="10"
                />
              </div>

              <button type="submit" class="btn btn-secondary">
                Join Lobby
              </button>
            </form>
          </div>

          <!-- Quick Match Section -->
          <div class="lobby-card quick-match">
            <h2>Quick Match</h2>
            <p>Jump into a game with random opponents</p>
            <form id="quick-match-form">
              <div class="form-group">
                <label for="player-name-quick">Your Name</label>
                <input
                  type="text"
                  id="player-name-quick"
                  name="playerName"
                  placeholder="Enter your name"
                  required
                  maxlength="20"
                />
              </div>
              <button type="submit" class="btn btn-accent">
                Find Game
              </button>
            </form>
          </div>
        </div>

        <div id="error-message" class="error-message" style="display: none;"></div>
      </div>
    </div>
  `;
}

const hooks = {
  before: async (params, state = {}) => {
    // Reset lobby state when coming to lobby home
    store.lobby.resetLobby();
  },
  after: async (params, state = {}) => {
    // Handle create lobby form
    const createForm = document.getElementById('create-lobby-form');
    createForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(createForm);
      const playerName = formData.get('playerName');
      const playerCount = parseInt(formData.get('playerCount'));

      try {
        // Use mock API to create lobby
        const lobbyData = await mockApi.createLobby(playerName, playerCount);

        // Update store with lobby data
        store.lobby.updateLobby(lobbyData.lobby);
        store.lobby.setCurrentPlayer({
          id: lobbyData.player.id,
          name: playerName,
          isHost: true,
          isReady: false
        });

        // Navigate to lobby waiting room
        router.navigate(`/lobby/${lobbyData.lobby.code}`);
      } catch (error) {
        showError('Failed to create lobby. Please try again.');
        console.error('Create lobby error:', error);
      }
    });

    // Handle join lobby form
    const joinForm = document.getElementById('join-lobby-form');
    joinForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(joinForm);
      const playerName = formData.get('playerName');
      const lobbyCode = formData.get('lobbyCode').toUpperCase();

      try {
        // Use mock API to join lobby
        const lobbyData = await mockApi.joinLobby(lobbyCode, playerName);

        // Update store with lobby data
        store.lobby.updateLobby(lobbyData.lobby);
        store.lobby.setCurrentPlayer({
          id: lobbyData.player.id,
          name: playerName,
          isHost: false,
          isReady: false
        });

        // Navigate to lobby waiting room
        router.navigate(`/lobby/${lobbyCode}`);
      } catch (error) {
        showError(error.message || 'Failed to join lobby. Please try again.');
        console.error('Join lobby error:', error);
      }
    });

    // Handle quick match form
    const quickMatchForm = document.getElementById('quick-match-form');
    quickMatchForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(quickMatchForm);
      const playerName = formData.get('playerName');

      try {
        // For quick match, just create a new 2-player lobby
        const lobbyData = await mockApi.createLobby(playerName, 2);

        // Update store with lobby data
        store.lobby.updateLobby(lobbyData.lobby);
        store.lobby.setCurrentPlayer({
          id: lobbyData.player.id,
          name: playerName,
          isHost: true,
          isReady: false
        });

        // Navigate to lobby waiting room
        router.navigate(`/lobby/${lobbyData.lobby.code}`);
      } catch (error) {
        showError('Failed to find match. Please try again.');
        console.error('Quick match error:', error);
      }
    });

    function showError(message) {
      const errorDiv = document.getElementById('error-message');
      errorDiv.textContent = message;
      errorDiv.style.display = 'block';
      setTimeout(() => {
        errorDiv.style.display = 'none';
      }, 5000);
    }
  }
};

export default {
  render,
  hooks
};
