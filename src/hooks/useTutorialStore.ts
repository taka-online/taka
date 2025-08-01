"use client";

import { create } from "zustand";
import { Piece } from "@/classes/Piece";
import { Position } from "@/classes/Position";
import {
  BoardSquareType,
  PlayerColor,
  SquareType,
  TutorialStep,
} from "@/types/types";
import {
  TUTORIAL_OPPONENT_COLOR,
  TUTORIAL_PLAYER_COLOR,
} from "@/utils/constants";
import {
  getValidPassTargets,
  getValidEmptySquarePassTargets,
  getTurnTargets,
  isPositionValidMovementTarget as isValidMovementTarget,
} from "@/services/gameValidation";
import {
  createBlankBoard,
  createBoardLayout,
  getBoardSquare as getBoardSquareHelper,
  getPieceAtPosition as getPieceAtPositionHelper,
  placeBallAtPosition as placeBallAtPositionHelper,
  movePieceOnBoard,
} from "@/services/boardHelpers";

/**
 * State interface for the tutorial store
 */
interface TutorialState {
  /** Array of all pieces currently on the board */
  pieces: Piece[];
  /** 2D array representing the board layout with pieces or null for empty squares */
  boardLayout: BoardSquareType[][];
  /** Position of the currently selected piece, if any */
  selectedPiece: Piece | null;
  /** Are we waiting for a user to select a direction for the piece **/
  awaitingDirectionSelection: boolean;
  /** Are we waiting for the user to consecutively pass */
  awaitingConsecutivePass: boolean;
  /* Is the turn button enabled */
  isTurnButtonEnabled: boolean;
  /* Whether to enable movement or not. This is used for tutorial steps */
  isMovementEnabled: boolean;
  /** Current step in the tutorial progression */
  currentStep: TutorialStep;
  /** Set of tutorial steps that have been completed */
  completedSteps: Set<TutorialStep>;
}

/**
 * Array of tutorial steps in order
 */
export const stepOrder: TutorialStep[] = [
  "welcome",
  "basic_movement",
  "turning",
  "movement_with_ball",
  "passing",
  "consecutive_pass",
  "ball_empty_square",
  "ball_pickup",
  "completed",
];

const demoPiece1 = new Piece(
  "W1",
  TUTORIAL_PLAYER_COLOR,
  new Position(4, 4),
  false,
);

/**
 * Predefined states for each tutorial step. This represents the state we should update. Anything not set won't get updated
 */
const tutorialStepStates: Record<TutorialStep, () => void> = {
  welcome: () => {
    useTutorialStore.setState({
      currentStep: "welcome",
      pieces: [],
      selectedPiece: null,
    });
  },
  basic_movement: () => {
    useTutorialStore.setState({
      currentStep: "basic_movement",
    });

    setBoardLayout([demoPiece1]);
  },
  turning: () => {
    demoPiece1.setHasBall(true);

    useTutorialStore.setState({
      currentStep: "turning",
      isMovementEnabled: false,
    });
  },
  movement_with_ball: () => {
    useTutorialStore.setState({
      currentStep: "movement_with_ball",
      isMovementEnabled: true,
    });
  },
  passing: () => {
    demoPiece1.setPosition(new Position(4, 4));
    demoPiece1.setFacingDirection("south");

    useTutorialStore.setState({
      currentStep: "passing",
      isMovementEnabled: false,
    });

    setBoardLayout([
      demoPiece1,
      new Piece("W2", TUTORIAL_PLAYER_COLOR, new Position(8, 0), false),
      new Piece("W3", TUTORIAL_PLAYER_COLOR, new Position(8, 4), false),
      new Piece("W4", TUTORIAL_PLAYER_COLOR, new Position(8, 8), false),
    ]);
  },
  consecutive_pass: () => {
    // Demo piece 1 will be the final piece to receive ball
    demoPiece1.setPosition(new Position(8, 4));
    demoPiece1.setFacingDirection("south");
    demoPiece1.setHasBall(false);

    useTutorialStore.setState({
      currentStep: "consecutive_pass",
      isMovementEnabled: false,
    });

    setBoardLayout([
      new Piece("W3", TUTORIAL_PLAYER_COLOR, new Position(4, 4), true),
      new Piece("W2", TUTORIAL_PLAYER_COLOR, new Position(8, 0), false),
      new Piece("B1", TUTORIAL_OPPONENT_COLOR, new Position(5, 4), false),
      demoPiece1,
    ]);
  },
  ball_empty_square: () => {
    useTutorialStore.setState({
      currentStep: "ball_empty_square",
      isMovementEnabled: false,
    });

    setBoardLayout([demoPiece1]);
  },
  ball_pickup: () => {
    // Position the demo piece at (4,4) and place a ball at (6,4)
    demoPiece1.setPosition(new Position(4, 4));
    demoPiece1.setHasBall(false);

    useTutorialStore.setState({
      currentStep: "ball_pickup",
      isMovementEnabled: true,
      selectedPiece: null,
    });

    // Set up board layout with piece at (4,4) and ball at (6,4)
    setBoardLayout([demoPiece1], [new Position(6, 4)]);
  },
  completed: () => {
    useTutorialStore.setState({
      currentStep: "completed",
      selectedPiece: null,
      isMovementEnabled: false,
    });
  },
};

const useTutorialStore = create<TutorialState>(() => ({
  pieces: [],
  boardLayout: createBlankBoard(),
  awaitingDirectionSelection: false,
  awaitingConsecutivePass: false,
  selectedPiece: null,
  isTurnButtonEnabled: false,
  isMovementEnabled: true,
  currentStep: "welcome",
  completedSteps: new Set<TutorialStep>(),
  tutorialActive: false,
}));

/**
 * Deselect the currently selected piece
 */
const deselectPiece = () => {
  const { selectedPiece } = useTutorialStore.getState();

  if (!selectedPiece) {
    // This should never happen. This is a bug if this gets called.
    throw new Error("Selected piece called when no piece was selected");
  }

  useTutorialStore.setState({
    awaitingDirectionSelection: false,
    selectedPiece: null,
    isTurnButtonEnabled: false,
  });
};

/**
 * Moves a piece from one position to another
 * @param piece - Piece to move
 * @param newPosition - Target position for the piece
 * @throws Error if piece exists at new position
 */
const movePiece = (piece: Piece, newPosition: Position) => {
  useTutorialStore.setState((state) => {
    const newBoardLayout = movePieceOnBoard(
      piece,
      newPosition,
      state.boardLayout,
    );
    return { boardLayout: newBoardLayout };
  });
};

/**
 * Sets the board layout with the given pieces
 * @param pieces - Array of pieces to place on the board
 * @param balls - Where to place balls
 */
export const setBoardLayout = (pieces: Piece[], balls?: Position[]) => {
  const boardLayout = createBoardLayout(pieces, balls);

  useTutorialStore.setState({
    pieces: [...pieces],
    boardLayout,
  });
};

/**
 * Gets the piece at a specific position on the board
 * @param position - The position to check
 * @returns The piece at the position or null if empty
 */
export const getPieceAtPosition = (position: Position): Piece | null => {
  const { boardLayout } = useTutorialStore.getState();
  return getPieceAtPositionHelper(position, boardLayout);
};

/**
 * Place a ball at a given position
 * @param position Position to place ball
 */
const placeBallAtPosition = (position: Position): void => {
  useTutorialStore.setState((state) => {
    const newBoardLayout = placeBallAtPositionHelper(
      position,
      state.boardLayout,
    );
    return { boardLayout: newBoardLayout };
  });
};
/**
 * Checks if a position is a valid movement target for the selected piece
 * @param position - The position to validate
 * @returns True if the position is a valid movement target
 */
export const isPositionValidMovementTarget = (position: Position): boolean => {
  const { selectedPiece, boardLayout } = useTutorialStore.getState();

  if (!selectedPiece) {
    return false;
  }

  return isValidMovementTarget(selectedPiece, position, boardLayout);
};

/**
 * Get the info for a square
 * @param position Current square position
 * @param currentPlayerColor Current player color
 * @return The type that the square should display
 */
export const getSquareInfo = (
  position: Position,
  currentPlayerColor: PlayerColor,
): SquareType => {
  const state = useTutorialStore.getState();

  // Tutorial is complete, don't let anything happen
  if (state.currentStep === "completed") return "nothing";

  // If we are waiting direction selection, the only actions are to turn, transfer selection, or deselect
  if (state.awaitingDirectionSelection) {
    const turnTargets = state.selectedPiece
      ? getTurnTargets(state.selectedPiece)
      : [];

    const isSquareTurnTarget = !!turnTargets.find((e) =>
      e.position.equals(position),
    );

    return isSquareTurnTarget ? "turn_target" : "nothing";
  }

  const piece = getPieceAtPosition(position);

  if (piece && piece.getColor() === currentPlayerColor) {
    if (
      state.selectedPiece &&
      state.selectedPiece.getHasBall() &&
      getValidPassTargets(state.selectedPiece, state.boardLayout).find((p) =>
        p.equals(position),
      )
    ) {
      return "pass_target";
    }

    return "piece";
  }

  if (state.isMovementEnabled && isPositionValidMovementTarget(position)) {
    return "movement";
  }

  // Check for empty square pass targets (only in ball_empty_square step)
  if (
    state.currentStep === "ball_empty_square" &&
    state.selectedPiece &&
    state.selectedPiece.getHasBall() &&
    getValidEmptySquarePassTargets(state.selectedPiece, state.boardLayout).find(
      (p) => p.equals(position),
    )
  ) {
    return "empty_pass_target";
  }

  return "nothing";
};

/**
 * Pass the ball
 * @param origin Origin piece to pass ball from
 * @param destination Destination to pass ball to
 */
const passBall = (origin: Position, destination: Position) => {
  const originPiece = getPieceAtPosition(origin);
  const destinationPiece = getPieceAtPosition(destination);

  if (!originPiece) {
    throw new Error("There must be a piece at both the origin");
  }

  if (!originPiece.getHasBall()) {
    throw new Error(
      "Trying to pass a ball from a piece that doesn't currently have a ball",
    );
  }

  originPiece.setHasBall(false);

  if (destinationPiece) {
    destinationPiece.setHasBall(true);
  } else {
    placeBallAtPosition(destination);
  }

  // Push an update to the state
  useTutorialStore.setState({});
};

/**
 * Handle turn target clicks during direction selection
 */
const handleTurnTarget = (position: Position): void => {
  const { selectedPiece } = useTutorialStore.getState();

  if (!selectedPiece) {
    throw new Error(
      "Awaiting direction selection, but there is no selected piece. This should never happen",
    );
  }

  const turnTarget = getTurnTargets(selectedPiece).find((e) =>
    e.position.equals(position),
  );

  if (!turnTarget) {
    // Since the clicked position is not a valid turn target, we are trying to deselect
    deselectPiece();
    return;
  }

  // Valid target, so turn piece
  selectedPiece.setFacingDirection(turnTarget.direction);

  // Turn is over
  useTutorialStore.setState({
    awaitingDirectionSelection: false,
    selectedPiece: null,
    isTurnButtonEnabled: false,
  });

  if (useTutorialStore.getState().currentStep === "turning") {
    nextStep();
  }
};

/**
 * Handle piece selection and potential passing
 */
const handlePieceSelection = (position: Position): void => {
  const { selectedPiece, currentStep } = useTutorialStore.getState();
  const pieceAtPosition = getPieceAtPosition(position);

  if (
    !pieceAtPosition ||
    pieceAtPosition.getColor() !== TUTORIAL_PLAYER_COLOR
  ) {
    return;
  }

  // Check if this is a pass target
  if (selectedPiece && selectedPiece.getHasBall()) {
    const state = useTutorialStore.getState();
    const passTargets = getValidPassTargets(selectedPiece, state.boardLayout);

    if (passTargets.find((p) => p.equals(pieceAtPosition.getPosition()))) {
      // This is a valid pass
      passBall(selectedPiece.getPosition(), position);

      if (currentStep === "passing") {
        nextStep();
        return;
      }

      // Set up for consecutive pass
      useTutorialStore.setState({
        awaitingConsecutivePass: true,
        selectedPiece: pieceAtPosition,
      });
      return;
    }
  }

  // Default action: select the piece
  useTutorialStore.setState({ selectedPiece: pieceAtPosition });

  // Enable the turn button after we select the piece
  if (currentStep === "turning") {
    useTutorialStore.setState({ isTurnButtonEnabled: true });
  }
};

/**
 * Handle pass target clicks during consecutive passing
 */
const handleConsecutivePass = (position: Position): void => {
  const { selectedPiece, currentStep } = useTutorialStore.getState();

  if (!selectedPiece) {
    throw new Error(
      "No selected piece, but we are awaiting a consecutive pass",
    );
  }

  if (!selectedPiece.getHasBall()) {
    throw new Error(
      "There is a selected piece, but it doesn't have the ball and we are awaiting a consecutive pass",
    );
  }

  const pieceAtPosition = getPieceAtPosition(position);

  if (
    !pieceAtPosition ||
    pieceAtPosition.getColor() !== TUTORIAL_PLAYER_COLOR
  ) {
    return;
  }

  const state = useTutorialStore.getState();
  const passTargets = getValidPassTargets(selectedPiece, state.boardLayout);

  // The clicked square must be a pass target
  if (!passTargets.find((p) => p.equals(pieceAtPosition.getPosition()))) {
    return;
  }

  // User is trying to pass
  passBall(selectedPiece.getPosition(), position);

  // If we just made our consecutive pass, move to next step
  if (currentStep === "consecutive_pass") {
    nextStep();
  }
};

/**
 * Handle movement to empty squares or squares with balls
 */
const handleMovement = (position: Position): void => {
  const { selectedPiece, currentStep } = useTutorialStore.getState();

  if (!selectedPiece) {
    return;
  }

  const state = useTutorialStore.getState();
  const boardSquare = getBoardSquareHelper(position, state.boardLayout);
  const isPickingUpBall = boardSquare === "ball";

  movePiece(selectedPiece, position);
  deselectPiece();

  // Check for step progression
  if (currentStep === "basic_movement") {
    nextStep();
  } else if (currentStep === "movement_with_ball") {
    nextStep();
  } else if (currentStep === "ball_pickup" && isPickingUpBall) {
    nextStep();
  }
};

/**
 * Handle passing to empty squares
 */
const handleEmptySquarePass = (position: Position): void => {
  const { selectedPiece, currentStep } = useTutorialStore.getState();

  if (!selectedPiece) {
    return;
  }

  passBall(selectedPiece.getPosition(), position);

  if (currentStep === "ball_empty_square") {
    nextStep();
  }
};

/**
 * Handle deselection when clicking on nothing
 */
const handleDeselection = (): void => {
  const { selectedPiece } = useTutorialStore.getState();

  if (selectedPiece) {
    deselectPiece();
  }
};

/**
 * Handles clicking on a square in the tutorial board
 * @param position - The position that was clicked
 */
export const handleSquareClick = (position: Position): void => {
  const { currentStep } = useTutorialStore.getState();

  // Tutorial is complete, don't let anything happen
  if (currentStep === "completed") return;

  // Use getSquareInfo to determine what type of square was clicked
  const squareType = getSquareInfo(position, TUTORIAL_PLAYER_COLOR);

  // Route to appropriate handler based on square type
  switch (squareType) {
    case "turn_target":
      return handleTurnTarget(position);
    case "pass_target":
      // Pass target can be either consecutive pass or regular piece selection
      const { awaitingConsecutivePass } = useTutorialStore.getState();
      return awaitingConsecutivePass
        ? handleConsecutivePass(position)
        : handlePieceSelection(position);
    case "piece":
      return handlePieceSelection(position);
    case "movement":
      return handleMovement(position);
    case "empty_pass_target":
      return handleEmptySquarePass(position);
    case "nothing":
    default:
      return handleDeselection();
  }
};

/**
 * Advances to the next step in the tutorial
 * @throws Error if already at the last step
 */
export const nextStep = () => {
  const state = useTutorialStore.getState();
  const currentIndex = stepOrder.indexOf(state.currentStep);

  if (currentIndex >= stepOrder.length - 1) {
    throw new Error("There are no more steps left to complete.");
  }

  const nextStep = stepOrder[currentIndex + 1];
  const newCompletedSteps = new Set(state.completedSteps);
  newCompletedSteps.add(state.currentStep);

  tutorialStepStates[nextStep]();

  useTutorialStore.setState({
    completedSteps: newCompletedSteps,
    selectedPiece: null,
    awaitingConsecutivePass: false,
  });
};

/**
 * Handle the turn piece button click
 */
export const handleTurnPiece = () => {
  const { selectedPiece, currentStep } = useTutorialStore.getState();

  if (!selectedPiece) return;

  if (currentStep !== "turning") return;

  useTutorialStore.setState({
    awaitingDirectionSelection: true,
  });
};

/**
 * Hook to access the tutorial store for reactive updates
 */
export const useTutorialBoard = () => {
  return useTutorialStore();
};
