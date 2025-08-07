import React from "react";
import {
  handleRetry,
  nextStep,
  stepOrder,
  useTutorialBoard,
} from "@/hooks/useTutorialStore";
import { TutorialStep } from "@/types/types";

interface TutorialPanelProps {
  className?: string;
}

const TutorialPanel: React.FC<TutorialPanelProps> = ({ className = "" }) => {
  const getTutorialContent = (
    step: TutorialStep,
  ): { title: string; content: string } => {
    switch (step) {
      case "welcome":
        return {
          title: "Welcome to Taka!",
          content:
            "Let's learn how to play this exciting football strategy game. Click 'Start Learning' to begin.",
        };

      case "turning":
        return {
          title: "Turning (Facing Direction)",
          content:
            "Select the piece with the ball, then click 'Turn Piece' to change its facing direction. You can also use arrow keys (↑↓←→) to turn directly!",
        };

      case "basic_movement":
        return {
          title: "Basic Movement",
          content:
            "Click the white piece, then click a highlighted destination square to move it.",
        };

      case "movement_with_ball":
        return {
          title: "Dribbling (Movement with Ball)",
          content:
            "Click the piece with the ball, then click a highlighted adjacent square to dribble. You'll then need to set its new facing direction.",
        };

      case "passing":
        return {
          title: "Passing Rules",
          content:
            "Select your piece with the ball, then click on a highlighted teammate to pass. You can only pass in the direction you are facing.",
        };

      case "passing_right":
        return {
          title: "Passing Rules (Different Direction)",
          content:
            "Select your piece with the ball, then click on a highlighted teammate to pass. You can only pass in the direction you are facing.",
        };

      case "consecutive_pass":
        return {
          title: "Consecutive Passes",
          content:
            "Make your first pass, then immediately make a second pass with the receiving piece. This counts as one turn.",
        };

      case "ball_empty_square":
        return {
          title: "Passing to Empty Squares (Loose Ball)",
          content:
            "Select your piece with the ball, then click on an empty square to pass there.",
        };

      case "ball_pickup":
        return {
          title: "Ball Pickup (Gaining Possession)",
          content:
            "Click the piece, then click on the ball to move there and pick it up.",
        };

      case "receiving_passes":
        return {
          title: "Receiving Passes (Moving to Pick Up)",
          content:
            "Pass the ball to an empty square near a teammate, then move that teammate to pick up the ball.",
        };

      case "chip_pass":
        return {
          title: "Chip Pass (Passing Over Pieces)",
          content:
            "Select your piece with the ball, then click 'Chip Pass' and choose a highlighted teammate to pass over defenders.",
        };

      case "shooting":
        return {
          title: "Shooting (Pass to Goal)",
          content:
            "Select your piece with the ball, then click on a highlighted goal square to shoot!",
        };

      case "tackling":
        return {
          title: "Tackling (Stealing the Ball)",
          content:
            "You can tackle (steal the ball from) an opponent if:\n\n1. Your piece is adjacent (vertically, horizontally, or diagonally) to their piece with the ball\n\n2. You're positioned in front of or to the side of their piece relative to their facing direction\n   (You cannot tackle from behind)\n\nAfter a successful tackle:\n• The two pieces swap positions\n• You gain possession of the ball\n• Your piece's facing direction is automatically set based on tackle direction\n\nSelect your white piece and click the highlighted opponent!",
        };

      case "activating_goalies":
        return {
          title: "Activating Goalies (Special Pieces)",
          content:
            "Goalies are special pieces with unique abilities:\n\n1. Only goalies can enter their own Goal Zone squares (4 squares of your goal area)\n\n2. Outside the Goal Zone, they move and act like normal pieces\n\n3. Goalies automatically block shots on goal if positioned on the straight-line path from shooter to goal (no action required)\n\n4. Opponents cannot chip pass over goalies when shooting from the last row (Row A or J)\n\nClick the unactivated goalie at the intersection, then place it in your goal area to activate it.",
        };

      case "completed":
        return {
          title: "Tutorial Complete!",
          content:
            "Congratulations! You've learned the basics of Taka. You're ready to play the full game!",
        };
    }
  };

  const { currentStep, completedSteps, showRetryButton } = useTutorialBoard();

  const tutorialContent = getTutorialContent(currentStep);

  const stepNumber = completedSteps.size + 1;
  const totalSteps = stepOrder.length;

  return (
    <div className={`rounded-lg bg-white p-6 shadow-lg ${className}`}>
      {/* Progress bar */}
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-600">Tutorial Progress</span>
          <span className="text-sm text-gray-600">
            {stepNumber}/{totalSteps}
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-500 transition-all duration-300"
            style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <h2 className="mb-3 text-2xl font-bold text-gray-800">
        {tutorialContent.title}
      </h2>

      <p className="mb-6 leading-relaxed whitespace-pre-line text-gray-600">
        {tutorialContent.content}
      </p>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        {currentStep === "welcome" && (
          <button
            onClick={nextStep}
            className="w-full cursor-pointer rounded bg-blue-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-600"
          >
            Start Learning
          </button>
        )}
        {showRetryButton && (
          <button
            onClick={handleRetry}
            className="w-full cursor-pointer rounded bg-red-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-600"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default TutorialPanel;
