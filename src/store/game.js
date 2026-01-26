export default {
  tabTitle: "Current Game",
  header: "Current Game",
  view: "game",
  currentState: {
    board: [
      [ 0, 0, 0, 0, 1, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 2, 0, 0, 0, 0 ]
    ],
    walls: {
      horizontal: [
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ]
      ],
      vertical: [
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ],
        [ 0, 0, 0, 0, 0, 0, 0, 0 ]
      ]
    },
    players: [
      { id: 1, walls: 10, color: 'blue', name: 'John' },
      { id: 2, walls: 10, color: 'red', name: 'Jane' }
    ],
    turn: 1,
    playerCount: 2,
    complete: false,
    winner: null
  },

  getPlayerCount: function () {
    return this.currentState.playerCount;
  },

  getPlayerById: function (id) {
    return this.currentState.players.find(player => player.id === id);
  },

  getNextTurn: function () {
    const nextTurn = this.currentState.turn + 1;
    return nextTurn <= this.currentState.playerCount ? nextTurn : 1;
  },

  checkWinner: function (playerId) {
    const position = this.findPlayerPosition(playerId);
    if (!position) return false;

    // Player 1 starts at row 0, wins by reaching row 8
    if (playerId === 1 && position.row === 8) {
      return true;
    }

    // Player 2 starts at row 8, wins by reaching row 0
    if (playerId === 2 && position.row === 0) {
      return true;
    }

    return false;
  },

  findPossibleMoves: function (playerId) {
    const board = this.currentState.board;
    const walls = this.currentState.walls;
    const currentPosition = this.findPlayerPosition(playerId);
    if (!currentPosition) return [];

    const { row, col } = currentPosition;
    const possibleMoves = [];
    const directions = [ [ -1, 0 ], [ 1, 0 ], [ 0, -1 ], [ 0, 1 ] ]; // Up, Down, Left, Right

    for (const [ dRow, dCol ] of directions) {
      const newRow = row + dRow;
      const newCol = col + dCol;

      if (this.isValidCell(newRow, newCol)) {
        if (!this.isWallBlocking([ row, col ], [ newRow, newCol ])) {
          if (board[newRow][newCol] === 0) {
            // Empty cell, can move here directly
            possibleMoves.push([ newRow, newCol ]);
          } else if (board[newRow][newCol] !== playerId) {
            // Opponent's pawn blocks direct move
            const jumpRow = newRow + dRow;
            const jumpCol = newCol + dCol;

            console.log('matsinet-!this.isWallBlocking([ newRow, newCol ], [ jumpRow, jumpCol ])', !this.isWallBlocking([ newRow, newCol ], [ jumpRow, jumpCol ]));
            if (this.isValidCell(jumpRow, jumpCol) && !this.isWallBlocking([ newRow, newCol ], [ jumpRow, jumpCol ])) {
              if (board[jumpRow][jumpCol] === 0) {
                // Can jump over opponent
                possibleMoves.push([ jumpRow, jumpCol ]);
              } else {
                // Can't jump, check for diagonal moves
                const diagonalMoves = [
                  [ newRow + dCol, newCol + dRow ],   // Diagonal left/right of move direction
                  [ newRow - dCol, newCol - dRow ]    // Diagonal other side of move direction
                ];

                for (const [ diagRow, diagCol ] of diagonalMoves) {
                  if (this.isValidCell(diagRow, diagCol)) {
                    // Check if diagonal move is legal
                    const isDiagonalBlocked = (
                      board[diagRow][diagCol] !== 0 || // Diagonal cell must be empty
                      this.isWallBlocking(walls, [ newRow, newCol ], [ diagRow, diagCol ]) // No walls blocking
                    );

                    if (!isDiagonalBlocked) {
                      possibleMoves.push([ diagRow, diagCol ]);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return possibleMoves;
  },

  isValidCell: function (row, col) {
    return row >= 0 && row < 9 && col >= 0 && col < 9;
  },

  isWallBlocking: function (from, to) {
    const walls = this.findAllWalls();
    const [ fromRow, fromCol ] = from;
    const [ toRow, toCol ] = to;

    // Check each wall to see if it blocks the movement
    for (const wall of walls) {
      const [ wallRow, wallCol ] = wall.position;

      // Moving vertically (up or down)
      if (fromCol === toCol && fromRow !== toRow) {
        // Horizontal walls block vertical movement
        if (wall.orientation === 'horizontal') {
          const minRow = Math.min(fromRow, toRow);
          const maxRow = Math.max(fromRow, toRow);

          // Wall blocks movement if:
          // 1. The wall is between the from and to rows (wallRow is between minRow and maxRow-1)
          // 2. The movement column is within the wall's span (fromCol === wallCol or fromCol === wallCol + 1)
          if (wallRow >= minRow && wallRow < maxRow) {
            if (fromCol === wallCol || fromCol === wallCol + 1) {
              return true;
            }
          }
        }
      }

      // Moving horizontally (left or right)
      if (fromRow === toRow && fromCol !== toCol) {
        // Vertical walls block horizontal movement
        if (wall.orientation === 'vertical') {
          const minCol = Math.min(fromCol, toCol);
          const maxCol = Math.max(fromCol, toCol);

          // Wall blocks movement if:
          // 1. The wall is between the from and to columns (wallCol is between minCol and maxCol-1)
          // 2. The movement row is within the wall's span (fromRow === wallRow or fromRow === wallRow + 1)
          if (wallCol >= minCol && wallCol < maxCol) {
            if (fromRow === wallRow || fromRow === wallRow + 1) {
              return true;
            }
          }
        }
      }
    }

    return false;
  },

  findPlayerPosition: function (player) {
    const board = this.currentState.board;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === player) {
          return { row: i, col: j };
        }
      }
    }
    return null;
  },

  isValidWallPlacement: function (gameState, position, orientation) {
    const [ row, col ] = position;
    const walls = gameState.walls;

    if (orientation === 'horizontal') {
      // Check if placement overlaps with existing walls
      return (col < 8 &&
        walls.horizontal[row][col] === 0 &&
        walls.horizontal[row][col + 1] === 0 &&
        walls.vertical[row][col] === 0 &&
        walls.vertical[row + 1][col] === 0);
    } else {  // vertical
      return (row < 8 &&
        walls.vertical[row][col] === 0 &&
        walls.vertical[row + 1][col] === 0 &&
        walls.horizontal[row][col] === 0 &&
        walls.horizontal[row][col + 1] === 0);
    }
  },

  findAllWalls: function () {
    const walls = [];

    // Find horizontal walls
    this.currentState.walls.horizontal.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell > 0) {
          walls.push({
            blocksCells: [
              [ rowIndex, colIndex ],
              [ rowIndex, colIndex + 1 ],
              [ rowIndex + 1, colIndex ],
              [ rowIndex + 1, colIndex + 1 ]
            ],
            isConfirmed: cell === 1,
            orientation: 'horizontal',
            position: [ rowIndex, colIndex ]
          });
        }
      });
    });

    // Find vertical walls
    this.currentState.walls.vertical.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell > 0) {
          walls.push({
            blocksCells: [
              [ rowIndex, colIndex ],
              [ rowIndex + 1, colIndex ],
              [ rowIndex, colIndex + 1 ],
              [ rowIndex + 1, colIndex + 1 ]
            ],
            isConfirmed: cell === 1,
            orientation: 'vertical',
            position: [ rowIndex, colIndex ]
          });
        }
      });
    });

    return walls;
  }
};

