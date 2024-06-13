import { Piece, Color, PieceType, Position, samePosition } from "../Constants";

export default class Referee {
  isTileEmptyOrOccupiedByOpponent(
    position: Position,
    boardState: Piece[],
    color: Color
  ) {
    return (
      !this.isTileOccupied(position, boardState) ||
      this.isTileOccupiedByOpponent(position, boardState, color)
    );
  }

  isTileOccupied(position: Position, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => samePosition(p.position, position));
    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isTileOccupiedByOpponent(
    position: Position,
    boardState: Piece[],
    color: Color
  ): boolean {
    const piece = boardState.find(
      (p) => samePosition(p.position, position) && p.color !== color
    );
    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isEnPassantMove(
    initialPosition: Position,
    desiredPosition: Position,
    boardState: Piece[],
    type: PieceType,
    color: Color
  ) {
    const pawnDirection = color === Color.WHITE ? 1 : -1;
    if (type === PieceType.PAWN) {
      if (
        (desiredPosition.x - initialPosition.x === -1 ||
          desiredPosition.x - initialPosition.x === 1) &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = boardState.find(
          (p) =>
            p.position.x &&
            p.position.y === desiredPosition.y - pawnDirection &&
            p.enPassant
        );
        if (piece) {
          return true;
        }
      }
    }
  }

  pawnMove(
    initialPosition: Position,
    desiredPosition: Position,
    color: Color,
    boardState: Piece[]
  ): boolean {
    const specialRow = color === Color.WHITE ? 1 : 6;
    const pawnDirection = color === Color.WHITE ? 1 : -1;

    // Double step forward from the initial position
    if (
      initialPosition.x === desiredPosition.x &&
      initialPosition.y === specialRow &&
      desiredPosition.y - initialPosition.y === 2 * pawnDirection
    ) {
      if (
        !this.isTileOccupied(desiredPosition, boardState) &&
        !this.isTileOccupied(
          { x: desiredPosition.x, y: desiredPosition.y - pawnDirection },
          boardState
        )
      ) {
        return true;
      }
    }

    // Single step forward
    if (
      initialPosition.x === desiredPosition.x &&
      desiredPosition.y - initialPosition.y === pawnDirection
    ) {
      if (!this.isTileOccupied(desiredPosition, boardState)) {
        return true;
      }
    }

    // Attacks from left
    if (
      desiredPosition.x - initialPosition.x === -1 &&
      desiredPosition.y - initialPosition.y === pawnDirection
    ) {
      if (this.isTileOccupiedByOpponent(desiredPosition, boardState, color)) {
        return true;
      }
    }

    // Attacks from right
    if (
      desiredPosition.x - initialPosition.x === 1 &&
      desiredPosition.y - initialPosition.y === pawnDirection
    ) {
      if (this.isTileOccupiedByOpponent(desiredPosition, boardState, color)) {
        return true;
      }
    }
    return false;
  }

  KnightMove(
    initialPosition: Position,
    desiredPosition: Position,
    color: Color,
    boardState: Piece[]
  ): boolean {
    for (let i = -1; i < 2; i += 2) {
      for (let j = -1; j < 2; j += 2) {
        // Top and bottom side
        if (desiredPosition.y - initialPosition.y === 2 * i) {
          if (desiredPosition.x - initialPosition.x === j) {
            // Valid move
            if (
              this.isTileEmptyOrOccupiedByOpponent(
                desiredPosition,
                boardState,
                color
              )
            ) {
              return true;
            }
          }
        }

        // Right and left side
        if (desiredPosition.x - initialPosition.x === 2 * i) {
          if (desiredPosition.y - initialPosition.y === j) {
            // Valid move
            if (
              this.isTileEmptyOrOccupiedByOpponent(
                desiredPosition,
                boardState,
                color
              )
            ) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  BishopMove(
    initialPosition: Position,
    desiredPosition: Position,
    color: Color,
    boardState: Piece[]
  ): boolean {
    for (let i = 1; i < 8; i++) {
      // Upper right
      if (
        desiredPosition.x > initialPosition.x &&
        desiredPosition.y > initialPosition.y
      ) {
        let passedPosition: Position = {
          x: initialPosition.x + i,
          y: initialPosition.y + i,
        };
        // Check if tile is destination tile
        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          // Destination
          if (
            this.isTileEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              color
            )
          ) {
            return true;
          }
        } else {
          // Dealing with a tile on the way
          if (this.isTileOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }

      // Bottom right
      if (
        desiredPosition.x > initialPosition.x &&
        desiredPosition.y < initialPosition.y
      ) {
        let passedPosition: Position = {
          x: initialPosition.x + i,
          y: initialPosition.y - i,
        };
        // Check if tile is the destination
        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              color
            )
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }

      // Bottom left
      if (
        desiredPosition.x < initialPosition.x &&
        desiredPosition.y < initialPosition.y
      ) {
        let passedPosition: Position = {
          x: initialPosition.x - i,
          y: initialPosition.y - i,
        };
        // Check if tile is the destination
        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              color
            )
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }

      // Upper left
      if (
        desiredPosition.x < initialPosition.x &&
        desiredPosition.y > initialPosition.y
      ) {
        let passedPosition: Position = {
          x: initialPosition.x - i,
          y: initialPosition.y + i,
        };
        // Check if tile is the destination
        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              color
            )
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }
    }
    return false;
  }

  RookMove(
    initialPosition: Position,
    desiredPosition: Position,
    color: Color,
    boardState: Piece[]
  ): boolean {
    if (initialPosition.x === desiredPosition.x) {
      // Moving vertically
      for (let i = 1; i < 8; i++) {
        let multiplier = desiredPosition.y < initialPosition.y ? -1 : 1;

        let passedPosition: Position = {
          x: initialPosition.x,
          y: initialPosition.y + i * multiplier,
        };
        if (
          passedPosition.x === desiredPosition.x &&
          passedPosition.y === desiredPosition.y
        ) {
          if (
            this.isTileEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              color
            )
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }
    }
    if (initialPosition.y === desiredPosition.y) {
      // Moving horizontally
      for (let i = 1; i < 8; i++) {
        let multiplier = desiredPosition.x < initialPosition.x ? -1 : 1;

        let passedPosition: Position = {
          x: initialPosition.x + i * multiplier,
          y: initialPosition.y,
        };
        if (samePosition(passedPosition, desiredPosition)) {
          // Arrived
          if (
            this.isTileEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              color
            )
          ) {
            return true;
          }
        } else {
          // Not destination
          if (this.isTileOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }
    }
    return false;
  }

  QueenMove(
    initialPosition: Position,
    desiredPosition: Position,
    color: Color,
    boardState: Piece[]
  ): boolean {
    for (let i = 1; i < 8; i++) {
      //vertical
      if (desiredPosition.x === initialPosition.x) {
        let multiplier = desiredPosition.y < initialPosition.y ? -1 : 1;
        let passedPosition: Position = {
          x: initialPosition.x,
          y: initialPosition.y + i * multiplier,
        };
        if (samePosition(passedPosition, desiredPosition)) {
          //destination
          if (
            this.isTileEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              color
            )
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
            break;
          }
        }
        //moving up or down
      }

      //Horizontal
      if (initialPosition.y === desiredPosition.y) {
        let multiplier = desiredPosition.x < initialPosition.x ? -1 : 1;
        let passedPosition: Position = {
          x: initialPosition.x + i * multiplier,
          y: initialPosition.y,
        };
        if (samePosition(passedPosition, desiredPosition)) {
          if (
            this.isTileEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              color
            )
          ) {
            return true;
          }
        } else {
          if (this.isTileOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }

      //top right
      if (
        desiredPosition.y > initialPosition.y &&
        desiredPosition.x > initialPosition.x
      ) {
        //moving up right
      }

      //bottom right
      if (
        desiredPosition.y < initialPosition.y &&
        desiredPosition.x > initialPosition.x
      ) {
        //moving up bottom right
      }

      //bottom left
      if (
        desiredPosition.y < initialPosition.y &&
        desiredPosition.x < initialPosition.x
      ) {
        //moving bottom left
      }

      //top left
      if (
        desiredPosition.y > initialPosition.y &&
        desiredPosition.x < initialPosition.x
      ) {
        //moving up left
      }
    }
    return false;
  }

  KingMove(
    initialPosition: Position,
    desiredPosition: Position,
    color: Color,
    boardState: Piece[]
  ): boolean {
    return false;
  }

  isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    color: Color,
    boardState: Piece[]
  ) {
    let validMove = false;
    switch (type) {
      case PieceType.PAWN:
        validMove = this.pawnMove(
          initialPosition,
          desiredPosition,
          color,
          boardState
        );
        break;
      case PieceType.KNIGHT:
        validMove = this.KnightMove(
          initialPosition,
          desiredPosition,
          color,
          boardState
        );
        break;
      case PieceType.BISHOP:
        validMove = this.BishopMove(
          initialPosition,
          desiredPosition,
          color,
          boardState
        );
        break;
      case PieceType.ROOK:
        validMove = this.RookMove(
          initialPosition,
          desiredPosition,
          color,
          boardState
        );
        break;
      case PieceType.QUEEN:
        validMove = this.QueenMove(
          initialPosition,
          desiredPosition,
          color,
          boardState
        );
        break;
      case PieceType.KING:
        validMove = this.KingMove(
          initialPosition,
          desiredPosition,
          color,
          boardState
        );
        break;
    }

    return validMove;
  }
}
