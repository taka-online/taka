import { Piece } from "@/classes/Piece";
import { Position } from "@/classes/Position";
import { DIRECTION_VECTORS, BOARD_ROWS, BOARD_COLS } from "@/utils/constants";
import { BoardType } from "@/types/types";

/**
 * Utility functions for game validation and calculations
 */

/**
 * Gets all valid movement positions for a piece. Accounts for blocked paths due to other pieces
 * @param piece - The piece to get movement targets for
 * @param boardLayout - Current board layout
 * @returns Array of valid target positions
 */
export const getValidMovementTargets = (
  piece: Piece,
  boardLayout: BoardType,
): Position[] => {
  // Get raw movement target from piece
  const allMoves = piece.getMovementTargets();

  // Account for other pieces and remove blocked paths
  const validMoves: Position[] = [];

  for (const pos of allMoves) {
    const [pRow, pCol] = pos.getPositionCoordinates();
    const square = boardLayout[pRow][pCol];
    // Allow movement to empty squares or squares with balls
    if (square === null || square === "ball") {
      validMoves.push(pos);
    }
  }

  return validMoves;
};

/**
 * Get all valid pass targets for a piece
 * @param origin - Piece to get pass targets of
 * @param boardLayout - Current board layout
 */
export const getValidPassTargets = (
  origin: Piece,
  boardLayout: BoardType,
): Position[] => {
  const validMoves: Position[] = [];

  const [curRow, curCol] = origin.getPosition().getPositionCoordinates();
  const facingDirection = origin.getFacingDirection();

  for (const [dRow, dCol] of DIRECTION_VECTORS) {
    if (
      (facingDirection === "north" && dRow > 0) ||
      (facingDirection === "east" && dCol < 0) ||
      (facingDirection === "south" && dRow < 0) ||
      (facingDirection === "west" && dCol > 0)
    ) {
      continue;
    }

    for (let distance = 1; ; distance++) {
      const newRow = curRow + dRow * distance;
      const newCol = curCol + dCol * distance;

      if (newRow < 0 || newRow > 13 || newCol < 0 || newCol > 9) {
        break;
      }

      const newPosition = new Position(newRow, newCol);
      const square = boardLayout[newRow][newCol];

      if (square instanceof Piece) {
        if (square.getColor() === origin.getColor()) {
          validMoves.push(newPosition);
          // Break as we can't pass behind a piece
          break;
        } else if (distance === 1) {
          // If this is an adjacent square AND the piece that is adjacent to the current piece is an opponent piece, we cannot chip pass, so break this path
          break;
        }
      }
    }
  }

  return validMoves;
};

/**
 * Get all valid empty square pass targets. This is used for passing the ball to an empty square
 * @param origin - Piece to check pass targets for
 * @param boardLayout - Current board layout
 */
export const getValidEmptySquarePassTargets = (
  origin: Piece,
  boardLayout: BoardType,
): Position[] => {
  const validMoves: Position[] = [];

  const [curRow, curCol] = origin.getPosition().getPositionCoordinates();
  const facingDirection = origin.getFacingDirection();

  for (const [dRow, dCol] of DIRECTION_VECTORS) {
    if (
      (facingDirection === "north" && dRow > 0) ||
      (facingDirection === "east" && dCol < 0) ||
      (facingDirection === "south" && dRow < 0) ||
      (facingDirection === "west" && dCol > 0)
    ) {
      continue;
    }

    for (let distance = 1; ; distance++) {
      const newRow = curRow + dRow * distance;
      const newCol = curCol + dCol * distance;

      if (newRow < 0 || newRow > 13 || newCol < 0 || newCol > 9) {
        break;
      }

      const newPosition = new Position(newRow, newCol);
      const square = boardLayout[newRow][newCol];

      if (square instanceof Piece) {
        // Break as we can't pass behind a piece
        break;
      }

      validMoves.push(newPosition);
    }
  }

  return validMoves;
};

/**
 * Get the valid turn targets for a piece
 * @param piece - Piece to get turn targets of
 */
export const getTurnTargets = (
  piece: Piece,
): Array<{
  position: Position;
  direction: "north" | "south" | "west" | "east";
}> => {
  const [row, col] = piece.getPosition().getPositionCoordinates();
  const targets = [];

  if (row - 1 >= 0)
    targets.push({
      position: new Position(row - 1, col),
      direction: "north" as const,
    });
  if (row + 1 < BOARD_ROWS)
    targets.push({
      position: new Position(row + 1, col),
      direction: "south" as const,
    });
  if (col - 1 >= 0)
    targets.push({
      position: new Position(row, col - 1),
      direction: "west" as const,
    });
  if (col + 1 < BOARD_COLS)
    targets.push({
      position: new Position(row, col + 1),
      direction: "east" as const,
    });

  return targets;
};

/**
 * Checks if a position is a valid movement target for a piece
 * @param piece - The piece to validate movement for
 * @param position - The position to validate
 * @param boardLayout - Current board layout
 * @returns True if the position is a valid movement target
 */
export const isPositionValidMovementTarget = (
  piece: Piece,
  position: Position,
  boardLayout: BoardType,
): boolean => {
  const targets = getValidMovementTargets(piece, boardLayout);

  return targets.some((target) => target.equals(position));
};
