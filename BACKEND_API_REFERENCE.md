# Backend API Reference

Quick reference for implementing the Pawns & Palisades backend API.

## Database Schema

### Lobbies Table
```sql
CREATE TABLE lobbies (
  id VARCHAR(255) PRIMARY KEY,
  code VARCHAR(10) UNIQUE NOT NULL,
  host_id VARCHAR(255) NOT NULL,
  player_count INTEGER NOT NULL CHECK (player_count IN (2, 4)),
  status VARCHAR(50) DEFAULT 'waiting',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_lobbies_code ON lobbies(code);
CREATE INDEX idx_lobbies_status ON lobbies(status);
```

### Players Table
```sql
CREATE TABLE players (
  id VARCHAR(255) PRIMARY KEY,
  lobby_id VARCHAR(255) REFERENCES lobbies(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  is_ready BOOLEAN DEFAULT FALSE,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_players_lobby ON players(lobby_id);
```

### Games Table (Optional - for persistence)
```sql
CREATE TABLE games (
  id VARCHAR(255) PRIMARY KEY,
  lobby_id VARCHAR(255) REFERENCES lobbies(id),
  state JSONB NOT NULL,
  status VARCHAR(50) DEFAULT 'in-progress',
  winner_id INTEGER,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMP
);
```

## API Endpoints Implementation

### 1. POST /api/lobbies (Create Lobby)

```javascript
async function createLobby(req, res) {
  const { playerName, playerCount } = req.body;

  // Validate input
  if (!playerName || !playerCount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (![2, 4].includes(playerCount)) {
    return res.status(400).json({ error: 'Player count must be 2 or 4' });
  }

  // Generate unique lobby code
  const lobbyCode = generateUniqueCode(); // e.g., 6 random alphanumeric chars
  const lobbyId = uuidv4();
  const playerId = uuidv4();

  // Create lobby
  await db.query(`
    INSERT INTO lobbies (id, code, host_id, player_count, status)
    VALUES ($1, $2, $3, $4, 'waiting')
  `, [lobbyId, lobbyCode, playerId, playerCount]);

  // Add host player
  await db.query(`
    INSERT INTO players (id, lobby_id, name, is_ready)
    VALUES ($1, $2, $3, FALSE)
  `, [playerId, lobbyId, playerName]);

  // Fetch and return lobby data
  const lobby = await getLobbyData(lobbyCode);
  const player = lobby.players.find(p => p.id === playerId);

  res.status(201).json({ lobby, player });
}

function generateUniqueCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}
```

### 2. POST /api/lobbies/:lobbyCode/join (Join Lobby)

```javascript
async function joinLobby(req, res) {
  const { lobbyCode } = req.params;
  const { playerName } = req.body;

  // Get lobby
  const lobby = await getLobbyData(lobbyCode);

  if (!lobby) {
    return res.status(404).json({ error: 'Lobby not found' });
  }

  if (lobby.status !== 'waiting') {
    return res.status(400).json({ error: 'Lobby is no longer accepting players' });
  }

  if (lobby.players.length >= lobby.playerCount) {
    return res.status(400).json({ error: 'Lobby is full' });
  }

  // Add player
  const playerId = uuidv4();
  await db.query(`
    INSERT INTO players (id, lobby_id, name, is_ready)
    VALUES ($1, $2, $3, FALSE)
  `, [playerId, lobby.id, playerName]);

  // Fetch updated lobby data
  const updatedLobby = await getLobbyData(lobbyCode);
  const player = updatedLobby.players.find(p => p.id === playerId);

  res.json({ lobby: updatedLobby, player });
}
```

### 3. POST /api/lobbies/quick-match (Quick Match)

```javascript
async function quickMatch(req, res) {
  const { playerName } = req.body;

  // Find available lobby with space
  const availableLobby = await db.query(`
    SELECT l.*, COUNT(p.id) as current_players
    FROM lobbies l
    LEFT JOIN players p ON l.id = p.lobby_id
    WHERE l.status = 'waiting'
    GROUP BY l.id
    HAVING COUNT(p.id) < l.player_count
    ORDER BY l.created_at ASC
    LIMIT 1
  `);

  if (availableLobby.rows.length > 0) {
    // Join existing lobby
    return joinLobby({ params: { lobbyCode: availableLobby.rows[0].code }, body: { playerName } }, res);
  } else {
    // Create new 2-player lobby
    const result = await createLobby({ body: { playerName, playerCount: 2 } }, {
      status: (code) => ({ json: (data) => {
        res.json({ ...data, isHost: true });
      }})
    });
  }
}
```

### 4. GET /api/lobbies/:lobbyCode (Get Lobby)

```javascript
async function getLobby(req, res) {
  const { lobbyCode } = req.params;

  const lobby = await getLobbyData(lobbyCode);

  if (!lobby) {
    return res.status(404).json({ error: 'Lobby not found' });
  }

  res.json(lobby);
}

async function getLobbyData(lobbyCode) {
  const lobbyResult = await db.query(`
    SELECT * FROM lobbies WHERE code = $1
  `, [lobbyCode]);

  if (lobbyResult.rows.length === 0) {
    return null;
  }

  const lobby = lobbyResult.rows[0];

  const playersResult = await db.query(`
    SELECT id, name, is_ready
    FROM players
    WHERE lobby_id = $1
    ORDER BY joined_at ASC
  `, [lobby.id]);

  return {
    id: lobby.id,
    code: lobby.code,
    hostId: lobby.host_id,
    playerCount: lobby.player_count,
    status: lobby.status,
    players: playersResult.rows.map(p => ({
      id: p.id,
      name: p.name,
      isReady: p.is_ready
    })),
    createdAt: lobby.created_at
  };
}
```

### 5. POST /api/lobbies/:lobbyCode/ready (Set Ready Status)

```javascript
async function setPlayerReady(req, res) {
  const { lobbyCode } = req.params;
  const { playerId, isReady } = req.body;

  const lobby = await getLobbyData(lobbyCode);

  if (!lobby) {
    return res.status(404).json({ error: 'Lobby not found' });
  }

  const player = lobby.players.find(p => p.id === playerId);

  if (!player) {
    return res.status(404).json({ error: 'Player not in lobby' });
  }

  await db.query(`
    UPDATE players
    SET is_ready = $1
    WHERE id = $2
  `, [isReady, playerId]);

  res.json({ success: true });
}
```

### 6. POST /api/lobbies/:lobbyCode/start (Start Game)

```javascript
async function startGame(req, res) {
  const { lobbyCode } = req.params;
  const { playerId } = req.body;

  const lobby = await getLobbyData(lobbyCode);

  if (!lobby) {
    return res.status(404).json({ error: 'Lobby not found' });
  }

  if (lobby.hostId !== playerId) {
    return res.status(403).json({ error: 'Only host can start game' });
  }

  if (lobby.players.length < 2) {
    return res.status(400).json({ error: 'Need at least 2 players' });
  }

  const allReady = lobby.players.every(p => p.isReady || p.id === lobby.hostId);
  if (!allReady) {
    return res.status(400).json({ error: 'All players must be ready' });
  }

  // Update lobby status
  await db.query(`
    UPDATE lobbies
    SET status = 'in-progress'
    WHERE code = $1
  `, [lobbyCode]);

  // Optionally create game record
  const gameId = uuidv4();
  const initialGameState = createInitialGameState(lobby);

  await db.query(`
    INSERT INTO games (id, lobby_id, state, status)
    VALUES ($1, $2, $3, 'in-progress')
  `, [gameId, lobby.id, JSON.stringify(initialGameState)]);

  res.json({ gameState: initialGameState });
}

function createInitialGameState(lobby) {
  // Return null to use client-side default state
  // Or create custom initial state here
  return null;
}
```

### 7. POST /api/lobbies/:lobbyCode/leave (Leave Lobby)

```javascript
async function leaveLobby(req, res) {
  const { lobbyCode } = req.params;
  const { playerId } = req.body;

  const lobby = await getLobbyData(lobbyCode);

  if (!lobby) {
    return res.json({ success: true }); // Already gone
  }

  // Remove player
  await db.query(`
    DELETE FROM players WHERE id = $1
  `, [playerId]);

  // Check if lobby is empty
  const remainingPlayers = await db.query(`
    SELECT COUNT(*) as count FROM players WHERE lobby_id = $1
  `, [lobby.id]);

  if (remainingPlayers.rows[0].count === 0) {
    // Delete empty lobby
    await db.query(`
      DELETE FROM lobbies WHERE id = $1
    `, [lobby.id]);
  } else if (lobby.hostId === playerId) {
    // Transfer host to first remaining player
    const newHost = await db.query(`
      SELECT id FROM players
      WHERE lobby_id = $1
      ORDER BY joined_at ASC
      LIMIT 1
    `, [lobby.id]);

    await db.query(`
      UPDATE lobbies
      SET host_id = $1
      WHERE id = $2
    `, [newHost.rows[0].id, lobby.id]);
  }

  res.json({ success: true });
}
```

## Game State Sync (Optional)

### PUT /api/games/:gameId/state

```javascript
async function updateGameState(req, res) {
  const { gameId } = req.params;
  const { gameState } = req.body;

  await db.query(`
    UPDATE games
    SET state = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
  `, [JSON.stringify(gameState), gameId]);

  res.json({ success: true });
}
```

### POST /api/games/:gameId/move

```javascript
async function submitMove(req, res) {
  const { gameId } = req.params;
  const { move } = req.body;

  // Fetch current game state
  const gameResult = await db.query(`
    SELECT state FROM games WHERE id = $1
  `, [gameId]);

  if (gameResult.rows.length === 0) {
    return res.status(404).json({ error: 'Game not found' });
  }

  let gameState = gameResult.rows[0].state;

  // Apply move to game state (implement game logic)
  gameState = applyMove(gameState, move);

  // Save updated state
  await db.query(`
    UPDATE games
    SET state = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
  `, [JSON.stringify(gameState), gameId]);

  res.json({ gameState });
}
```

## Cleanup Jobs

### Periodic Cleanup of Stale Lobbies

```javascript
// Run every 5 minutes
setInterval(async () => {
  await db.query(`
    DELETE FROM lobbies
    WHERE status = 'waiting'
    AND created_at < NOW() - INTERVAL '30 minutes'
  `);
}, 5 * 60 * 1000);
```

## WebSocket Alternative (Recommended)

Instead of polling, use WebSockets for real-time updates:

```javascript
io.on('connection', (socket) => {
  socket.on('join-lobby', async (lobbyCode) => {
    socket.join(`lobby:${lobbyCode}`);
  });

  socket.on('player-joined', async ({ lobbyCode, playerData }) => {
    io.to(`lobby:${lobbyCode}`).emit('lobby-updated', await getLobbyData(lobbyCode));
  });

  socket.on('player-ready', async ({ lobbyCode, playerId, isReady }) => {
    // Update database
    await setPlayerReady(lobbyCode, playerId, isReady);
    // Broadcast to lobby
    io.to(`lobby:${lobbyCode}`).emit('lobby-updated', await getLobbyData(lobbyCode));
  });

  socket.on('game-started', ({ lobbyCode, gameState }) => {
    io.to(`lobby:${lobbyCode}`).emit('game-start', gameState);
  });
});
```

## Error Handling

All endpoints should handle errors consistently:

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});
```

## CORS Configuration

```javascript
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:8080',
  credentials: true
}));
```

## Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```
