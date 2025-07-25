// Types
export type PlayerColor = "white" | "black";

export type TutorialStep =
  | "welcome"
  | "basic_movement"
  | "turning"
  | "movement_with_ball"
  | "completed";

export type FacingDirection = "north" | "south" | "west" | "east";

export type SquareType = "nothing" | "cancellable" | "movement" | "turn_target";
