export class Position {
  private readonly row: number; // 0-9 (A-J)
  private readonly col: number; // 0-13 (1-14)

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  getPositionCoordinates() {
    return [this.row, this.col];
  }

  isPositionInGoal() {
    return (
      this.row >= 3 && this.row <= 6 && (this.col === 0 || this.col === 13)
    );
  }

  equals(o: Position) {
    const myPos = this.getPositionCoordinates();
    const theirPos = o.getPositionCoordinates();

    return myPos[0] === theirPos[0] && myPos[1] === theirPos[1];
  }
}
