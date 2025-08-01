import { Piece } from "@/classes/Piece";
import { Position } from "@/classes/Position";
import { BoardSquareType } from "@/types/types";
import { BOARD_ROWS, BOARD_COLS } from "@/utils/constants";

/**
 * Board manipulation utilities
 */

/**
 * Creates a BOARD_ROWS x BOARD_COLS blank board filled with null values
 * @returns A 2D array representing an empty game board
 */
export const createBlankBoard = (): BoardSquareType[][] =>
  Array.from({ length: BOARD_ROWS }, () =>
    (Array(BOARD_COLS) as (Piece | null)[]).fill(null),
  );

/**
 * Sets the board layout with the given pieces
 * @param pieces - Array of pieces to place on the board
 * @param balls - Where to place balls
 * @returns New board layout
 */
export const createBoardLayout = (
  pieces: Piece[],
  balls?: Position[],
): BoardSquareType[][] => {
  const boardLayout = createBlankBoard();

  pieces.forEach((piece) => {
    const [row, col] = piece.getPosition().getPositionCoordinates();
    boardLayout[row][col] = piece;
  });

  if (balls) {
    balls.forEach((pos) => {
      const [row, col] = pos.getPositionCoordinates();

      if (boardLayout[row][col] !== null) {
        throw new Error("Balls and pieces cannot be overlapping");
      }

      boardLayout[row][col] = "ball";
    });
  }

  return boardLayout;
};

/**
 * Get the piece or ball at a board square
 * @param position - Position to get info for
 * @param boardLayout - Current board layout
 */
export const getBoardSquare = (
  position: Position,
  boardLayout: BoardSquareType[][],
): BoardSquareType => {
  const [row, col] = position.getPositionCoordinates();
  return boardLayout[row][col];
};

/**
 * Gets the piece at a specific position on the board
 * @param position - The position to check
 * @param boardLayout - Current board layout
 * @returns The piece at the position or null if empty
 */
export const getPieceAtPosition = (
  position: Position,
  boardLayout: BoardSquareType[][],
): Piece | null => {
  const square = getBoardSquare(position, boardLayout);
  return square instanceof Piece ? square : null;
};

/**
 * Place a ball at a given position
 * @param position - Position to place ball
 * @param boardLayout - Current board layout
 * @returns New board layout with ball placed
 */
export const placeBallAtPosition = (
  position: Position,
  boardLayout: BoardSquareType[][],
): BoardSquareType[][] => {
  const square = getBoardSquare(position, boardLayout);

  if (square !== null) {
    throw new Error("Cannot place a ball on an occupied square");
  }

  const [row, col] = position.getPositionCoordinates();
  const newBoardLayout = boardLayout.map((row) => [...row]);
  newBoardLayout[row][col] = "ball";

  return newBoardLayout;
};

/**
 * Move a piece to a new position on the board
 * @param piece - Piece to move
 * @param newPosition - Target position for the piece
 * @param boardLayout - Current board layout
 * @returns New board layout with piece moved
 */
export const movePieceOnBoard = (
  piece: Piece,
  newPosition: Position,
  boardLayout: BoardSquareType[][],
): BoardSquareType[][] => {
  if (getPieceAtPosition(newPosition, boardLayout)) {
    throw new Error("There can't be a piece at the new location.");
  }

  const [oRow, oCol] = piece.getPosition().getPositionCoordinates();
  const [nRow, nCol] = newPosition.getPositionCoordinates();

  const newBoardLayout = boardLayout.map((row) => [...row]);
  const targetSquare = newBoardLayout[nRow][nCol];

  // If there's a ball at the target position, pick it up
  if (targetSquare === "ball") {
    piece.setHasBall(true);
  }

  piece.setPosition(newPosition);
  newBoardLayout[oRow][oCol] = null;
  newBoardLayout[nRow][nCol] = piece;

  return newBoardLayout;
};
