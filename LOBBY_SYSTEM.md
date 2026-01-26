# Game Lobby System Documentation

## Overview

The game lobby system allows players to create or join game lobbies before starting a match. It supports both manual lobby creation/joining via lobby codes and quick-match functionality for automatic player matching.

## Features

- ✅ Create new lobbies with 2 or 4 player support
- ✅ Join existing lobbies using lobby codes
- ✅ Quick match for auto-matching with random players
- ✅ Real-time lobby status updates (via polling)
- ✅ Player ready/not ready status
- ✅ Host-controlled game start
- ✅ Automatic player color assignment
- ✅ Lobby code sharing functionality

## User Flow

### 1. Lobby Home (`/lobby`)
Players land on the lobby home page where they can:
- **Create a new lobby**: Enter name, choose player count (2 or 4), become host
- **Join existing lobby**: Enter name and lobby code
- **Quick match**: Enter name and get auto-matched with other players

### 2. Lobby Waiting Room (`/lobby/:code`)
After creating or joining a lobby:
- **View all players** in the lobby with their ready status
- **See lobby code** and share it with friends
- **Toggle ready status** (non-host players)
- **Start game** (host only, when all players are ready)
- **Leave lobby** at any time

### 3. Game Start
When the host starts the game:
- Players are assigned colors (blue, red, yellow, green)
- Game state is initialized with lobby player data
- All players navigate to the game view (`/game`)

## File Structure

```
src/
├── views/
│   ├── lobbyHome.js          # Lobby home page (create/join/quick match)
│   └── lobbyWaiting.js       # Lobby waiting room
├── store/
│   └── lobby.js              # Lobby state management
├── services/
│   └── api.js                # API service layer (with mock API)
└── assets/css/views/
    ├── lobbyHome.scss        # Lobby home styles
    └── lobbyWaiting.scss     # Lobby waiting room styles
```

## Backend API Requirements

### Base URL
Configure in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://your-backend-url.com/api';
```

### Required Endpoints

#### 1. Create Lobby
```http
POST /api/lobbies
Content-Type: application/json

{
  "playerName": "John",
  "playerCount": 2
}

Response:
{
  "lobby": {
    "id": "abc123",
    "code": "ABC123",
    "hostId": "player_1",
    "playerCount": 2,
    "players": [{
      "id": "player_1",
      "name": "John",
      "isReady": false
    }],
    "status": "waiting",
    "createdAt": "2026-01-25T..."
  },
  "player": {
    "id": "player_1",
    "name": "John",
    "isReady": false
  }
}
```

#### 2. Join Lobby
```http
POST /api/lobbies/:lobbyCode/join
Content-Type: application/json

{
  "playerName": "Jane"
}

Response: Same structure as Create Lobby
```

#### 3. Quick Match
```http
POST /api/lobbies/quick-match
Content-Type: application/json

{
  "playerName": "Alex"
}

Response:
{
  "lobby": { ... },
  "player": { ... },
  "isHost": true/false
}
```

#### 4. Get Lobby Details
```http
GET /api/lobbies/:lobbyCode

Response:
{
  "id": "abc123",
  "code": "ABC123",
  "hostId": "player_1",
  "playerCount": 2,
  "players": [...],
  "status": "waiting",
  "createdAt": "2026-01-25T..."
}
```

#### 5. Set Player Ready Status
```http
POST /api/lobbies/:lobbyCode/ready
Content-Type: application/json

{
  "playerId": "player_1",
  "isReady": true
}

Response:
{
  "success": true
}
```

#### 6. Start Game
```http
POST /api/lobbies/:lobbyCode/start
Content-Type: application/json

{
  "playerId": "player_1"  // Must be host
}

Response:
{
  "gameState": {
    // Optional: Initial game state from server
    // If null, will use default client game state
  }
}
```

#### 7. Leave Lobby
```http
POST /api/lobbies/:lobbyCode/leave
Content-Type: application/json

{
  "playerId": "player_1"
}

Response:
{
  "success": true
}
```

### Game State Sync Endpoints (Optional)

#### Update Game State
```http
PUT /api/games/:gameId/state
Content-Type: application/json

{
  "gameState": {
    "board": [...],
    "walls": {...},
    "turn": 1,
    // ... full game state
  }
}
```

#### Submit Move
```http
POST /api/games/:gameId/move
Content-Type: application/json

{
  "move": {
    "type": "pawn" | "wall",
    "playerId": 1,
    "details": {
      // Move-specific data
    }
  }
}

Response:
{
  "gameState": { ... }  // Updated game state
}
```

## Using Mock API (Development)

The system includes a mock API for development without a backend:

1. Set environment variable or modify `src/services/api.js`:
```javascript
// Use mock API
export default {
  lobby: mockApi,  // Instead of lobbyApi
  game: gameApi
};
```

2. Mock API features:
- Stores lobbies in memory (Map)
- Simulates network delays
- Generates random lobby codes
- Full CRUD operations for lobbies

## Integration with Game View

When a game starts from the lobby:

1. **Player Data Transfer**:
```javascript
// Lobby players are converted to game players
store.game.currentState.players = [
  { id: 1, walls: 10, color: 'blue', name: 'John', lobbyPlayerId: 'player_1' },
  { id: 2, walls: 10, color: 'red', name: 'Jane', lobbyPlayerId: 'player_2' }
];
```

2. **Player Count**:
```javascript
store.game.currentState.playerCount = lobby.playerCount; // 2 or 4
```

3. **Wall Count**:
- 2 players: 10 walls each
- 4 players: 5 walls each

## State Management

### Lobby Store (`store/lobby.js`)

```javascript
{
  currentLobby: {
    id: string,
    code: string,
    hostId: string,
    playerCount: number,  // 2 or 4
    players: Array<{
      id: string,
      name: string,
      isReady: boolean
    }>,
    status: 'waiting' | 'ready' | 'in-progress' | 'completed',
    createdAt: string
  },
  currentPlayer: {
    id: string,
    name: string,
    isHost: boolean,
    isReady: boolean
  }
}
```

### Key Methods

- `createLobby(playerName, playerCount)` - Create new lobby
- `joinLobby(lobbyCode, playerName)` - Join existing lobby
- `setPlayerReady(playerId, isReady)` - Update ready status
- `allPlayersReady()` - Check if all players are ready
- `isLobbyFull()` - Check if lobby is at capacity
- `getLobbyPlayersForGame()` - Convert lobby players to game format
- `resetLobby()` - Clear lobby state

## Routing

Add these routes to your router in `src/index.js`:

```javascript
router.on({
  "/": () => render('home'),
  "/lobby": () => render('lobbyHome'),
  "/lobby/:id": params => render('lobbyWaiting'),
  "/game": () => render('game'),
  // ... other routes
});
```

## Polling Strategy

The lobby waiting room polls the server every 2 seconds for updates:

```javascript
setInterval(async () => {
  const lobbyData = await fetch(`/api/lobbies/${lobbyCode}`);
  // Update state and re-render if players changed
}, 2000);
```

**Consider upgrading to WebSockets for:**
- Real-time updates without polling
- Reduced server load
- Instant player join/leave notifications
- Live game state sync

## Environment Configuration

Create a `.env` file:

```env
API_BASE_URL=http://localhost:3000/api
USE_MOCK_API=false
```

## Testing Checklist

- [ ] Create lobby with 2 players
- [ ] Create lobby with 4 players
- [ ] Join lobby with valid code
- [ ] Join lobby with invalid code (should error)
- [ ] Join full lobby (should error)
- [ ] Toggle ready status as non-host
- [ ] Start game as host when all ready
- [ ] Start game fails when not all ready
- [ ] Quick match finds/creates lobby
- [ ] Leave lobby removes player
- [ ] Leave lobby as host transfers host to another player
- [ ] Copy lobby code to clipboard
- [ ] Lobby polling updates when players join/leave
- [ ] Game initializes correctly with lobby players

## Next Steps

1. **Backend Implementation**: Implement the API endpoints listed above
2. **WebSocket Integration**: Replace polling with real-time WebSocket updates
3. **Authentication**: Add user authentication and persistent player profiles
4. **Matchmaking**: Implement ELO ratings and skill-based matching
5. **Game History**: Store completed games and player statistics
6. **Reconnection**: Allow players to rejoin if disconnected
7. **Spectator Mode**: Allow users to watch ongoing games

## Support

For questions or issues with the lobby system, refer to:
- API documentation: `/api/docs` (when backend is implemented)
- Frontend codebase: `src/views/lobby*.js` and `src/store/lobby.js`
- Service layer: `src/services/api.js`
