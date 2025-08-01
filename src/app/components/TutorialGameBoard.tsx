"use client";

import React from "react";
import BoardCell from "./BoardCell";
import {
  BOARD_COLS,
  BOARD_ROWS,
  TUTORIAL_PLAYER_COLOR,
} from "@/utils/constants";
import { Position } from "@/classes/Position";
import {
  getSquareInfo,
  handleTurnPiece,
  useTutorialBoard,
} from "@/hooks/useTutorialStore";

const TutorialGameBoard: React.FC = () => {
  const { boardLayout, selectedPiece, isTurnButtonEnabled } =
    useTutorialBoard();

  const colLabels = Array.from({ length: BOARD_COLS }, (_, i) =>
    // String.fromCharCode(65 + i),
    i.toString(),
  ); // A-J
  const rowLabels = Array.from({ length: BOARD_ROWS }, (_, i) =>
    // (i + 1).toString(),
    i.toString(),
  ); // 1-14

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {/* Turn controls */}
      <div className="mb-4 flex flex-shrink-0 justify-center gap-4">
        <button
          className={`rounded px-6 py-2 font-semibold text-white transition-colors ${
            !isTurnButtonEnabled
              ? "cursor-not-allowed bg-gray-400"
              : "cursor-pointer bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleTurnPiece}
          disabled={!isTurnButtonEnabled}
        >
          Turn Piece
        </button>
      </div>

      {/* Game board container with shadow and border */}
      <div className="h-full max-h-full w-auto rounded-lg border-2 border-green-200 bg-green-50 p-4 shadow-2xl">
        <div
          className="relative grid h-full"
          style={{
            gridTemplateColumns: `2rem repeat(${BOARD_COLS}, 1fr)`,
            gridTemplateRows: `2rem repeat(${BOARD_ROWS}, 1fr)`,
          }}
        >
          <div className="mb-1 flex items-center justify-center" />

          {colLabels.map((label) => (
            <div
              key={`col-${label}`}
              className="mb-1 flex items-center justify-center text-sm font-semibold text-gray-700"
            >
              {label}
            </div>
          ))}

          {rowLabels.map((rowLabel, rowIndex) => (
            <React.Fragment key={`row-${rowLabel}`}>
              <div className="mr-1 flex items-center justify-center text-sm font-semibold text-gray-700">
                {rowLabel}
              </div>

              {colLabels.map((_, colIndex) => {
                const position = new Position(rowIndex, colIndex);
                const piece = boardLayout[rowIndex][colIndex];
                const squareInfo = getSquareInfo(
                  position,
                  TUTORIAL_PLAYER_COLOR,
                );

                return (
                  <BoardCell
                    key={`cell-${rowIndex}-${colIndex}`}
                    position={position}
                    piece={piece}
                    squareInfo={squareInfo}
                    selectedPiece={selectedPiece}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorialGameBoard;
