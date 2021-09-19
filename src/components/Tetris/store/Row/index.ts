import { range } from 'lodash';
import { Point } from '../../types';
import { Brick } from '../Brick';
import { BrickContext } from '../BrickContext';

export class Row {
  private brickContext: BrickContext;

  private bricks: Brick[];

  constructor(options: {
    brickContext: BrickContext;
    bricks: Brick[];
  }) {
    this.brickContext = options.brickContext;
    this.bricks = options.bricks;
  }

  isMovingDownPossible() {
    const currentPoints: Point[] = range(this.brickContext.size.width)
      .map((x) => ({ x, y: this.bricks[0].point.y }));

    return currentPoints.every((point) => {
      if (this.brickContext.checkIfPointIsOutOfRange({ x: point.x, y: point.y - 1 })) {
        return false;
      }

      return !this.brickContext.checkIfBrickAtPoint({ x: point.x, y: point.y - 1 });
    });
  }

  moveDown() {
    if (!this.isMovingDownPossible()) return;

    this.bricks.forEach((brick) => {
      brick.setPoint({ x: brick.point.x, y: brick.point.y - 1 });
    });
  }
}
