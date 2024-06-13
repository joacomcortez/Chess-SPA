export const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const GRID_SIZE = 100;

export interface Position {
  x: number;
  y: number;
}
export function samePosition(p1: Position, p2: Position) {
  return p1.x === p2.x && p1.y === p2.y;
}
export enum PieceType {
  PAWN,
  KNIGHT,
  BISHOP,
  ROOK,
  QUEEN,
  KING,
}
export enum Color {
  BLACK,
  WHITE,
}

export interface Piece {
  image: string | undefined;
  position: Position;
  type: PieceType;
  color: Color;
  enPassant?: boolean;
}

export const initialBoardState: Piece[] = [
  {
    image: `assets/images/rook_b.png`,
    position: { x: 0, y: 7 },
    type: PieceType.ROOK,
    color: Color.BLACK,
  },
  {
    image: `assets/images/knight_b.png`,
    position: { x: 1, y: 7 },

    type: PieceType.KNIGHT,
    color: Color.BLACK,
  },
  {
    image: `assets/images/bishop_b.png`,
    position: { x: 2, y: 7 },

    type: PieceType.BISHOP,
    color: Color.BLACK,
  },
  {
    image: `assets/images/queen_b.png`,
    position: { x: 3, y: 7 },

    type: PieceType.QUEEN,
    color: Color.BLACK,
  },
  {
    image: `assets/images/king_b.png`,
    position: { x: 4, y: 7 },

    type: PieceType.KING,
    color: Color.BLACK,
  },
  {
    image: `assets/images/rook_b.png`,
    position: { x: 7, y: 7 },

    type: PieceType.ROOK,
    color: Color.BLACK,
  },
  {
    image: `assets/images/knight_b.png`,
    position: { x: 6, y: 7 },

    type: PieceType.KNIGHT,
    color: Color.BLACK,
  },
  {
    image: `assets/images/bishop_b.png`,
    position: { x: 5, y: 7 },

    type: PieceType.BISHOP,
    color: Color.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: { x: 0, y: 6 },

    type: PieceType.PAWN,
    color: Color.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: { x: 2, y: 6 },

    type: PieceType.PAWN,
    color: Color.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: { x: 3, y: 6 },

    type: PieceType.PAWN,
    color: Color.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: { x: 4, y: 6 },

    type: PieceType.PAWN,
    color: Color.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: { x: 5, y: 6 },

    type: PieceType.PAWN,
    color: Color.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: { x: 6, y: 6 },

    type: PieceType.PAWN,
    color: Color.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: { x: 7, y: 6 },

    type: PieceType.PAWN,
    color: Color.BLACK,
  },
  {
    image: `assets/images/pawn_b.png`,
    position: { x: 1, y: 6 },

    type: PieceType.PAWN,
    color: Color.BLACK,
  },
  {
    image: `assets/images/rook_w.png`,
    position: { x: 0, y: 0 },

    type: PieceType.ROOK,
    color: Color.WHITE,
  },
  {
    image: `assets/images/knight_w.png`,
    position: { x: 1, y: 0 },

    type: PieceType.KNIGHT,
    color: Color.WHITE,
  },
  {
    image: `assets/images/bishop_w.png`,
    position: { x: 2, y: 0 },

    type: PieceType.BISHOP,
    color: Color.WHITE,
  },
  {
    image: `assets/images/queen_w.png`,
    position: { x: 3, y: 0 },

    type: PieceType.QUEEN,
    color: Color.WHITE,
  },
  {
    image: `assets/images/king_w.png`,
    position: { x: 4, y: 0 },

    type: PieceType.KING,
    color: Color.WHITE,
  },
  {
    image: `assets/images/rook_w.png`,
    position: { x: 7, y: 0 },

    type: PieceType.ROOK,
    color: Color.WHITE,
  },
  {
    image: `assets/images/knight_w.png`,
    position: { x: 6, y: 0 },

    type: PieceType.KNIGHT,
    color: Color.WHITE,
  },
  {
    image: `assets/images/bishop_w.png`,
    position: { x: 5, y: 0 },

    type: PieceType.BISHOP,
    color: Color.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: { x: 0, y: 1 },

    type: PieceType.PAWN,
    color: Color.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: { x: 1, y: 1 },

    type: PieceType.PAWN,
    color: Color.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: { x: 2, y: 1 },

    type: PieceType.PAWN,
    color: Color.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: { x: 3, y: 1 },

    type: PieceType.PAWN,
    color: Color.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: { x: 4, y: 1 },

    type: PieceType.PAWN,
    color: Color.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: { x: 5, y: 1 },

    type: PieceType.PAWN,
    color: Color.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: { x: 6, y: 1 },

    type: PieceType.PAWN,
    color: Color.WHITE,
  },
  {
    image: `assets/images/pawn_w.png`,
    position: { x: 7, y: 1 },

    type: PieceType.PAWN,
    color: Color.WHITE,
  },
];
