import { makeAutoObservable } from 'mobx';
import { Brick } from '../Brick';
import { BrickContext } from '../BrickContext';
import { Options } from './types';

export class BrickHeap {
  bricks: Brick[];

  private brickContext: BrickContext;

  constructor(options: Options) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.bricks = [];
    this.brickContext = options.brickContext;
  }

  addBricks(...addingBricks: Brick[]) {
    this.bricks = [...this.bricks, ...addingBricks];
  }

  removeBricks(...removingBricks: Brick[]) {
    this.bricks = this.bricks.filter((brick) => !removingBricks.includes(brick));
  }

  getFilledRows() {
    if (!this.bricks.length) return [];

    const highestBrick = this.bricks.reduce((maxBrick, brick) => maxBrick.point.y < brick.point.y ? brick : maxBrick);
    const filledRows = [];
    
    for (let i = 0; i <= highestBrick.point.y; i++) {
      const bricksRow = this.bricks.filter((brick) => brick.point.y === i);

      if (bricksRow.length === this.brickContext.size.width) {
        filledRows.push(bricksRow);
      }
    }

    return filledRows;
  }
}
