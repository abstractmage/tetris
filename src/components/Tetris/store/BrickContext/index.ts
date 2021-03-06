import { makeAutoObservable } from 'mobx';
import { Point, Size } from '../../types';
import { Brick } from '../Brick';
import { Options } from './types';

export class BrickContext {
  bricks: Brick[];

  size: Size;

  constructor(options: Options) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.bricks = [];
    this.size = options.size;
  }

  get startPoint() {
    const halfWidth = this.size.width / 2;
    let x = 0;

    if (halfWidth === Math.ceil(halfWidth)) x = halfWidth;
    else x = Math.floor(halfWidth);

    return { x, y: this.size.height };
  }
  
  addBricks(...addingBricks: Brick[]) {
    this.bricks = [...this.bricks, ...addingBricks];
  }

  removeBricks(...removingBricks: Brick[]) {
    this.bricks = this.bricks.filter((brick) => !removingBricks.includes(brick));
  }

  clear() {
    this.bricks = [];
  }

  checkIfBrickAtPoint(point: Point) {
    return !!this.bricks.find((brick) => brick.point.x === point.x && brick.point.y === point.y);
  }

  getBrickByPoint(point: Point) {
    const brick = this.bricks.find((brick) => brick.point.x === point.x && brick.point.y === point.y) || null;

    if (!brick) {
      throw new Error(`${this.constructor.name}.getBrickByPoint: no such brick exists`);
    }

    return brick;
  }

  checkIfPointIsOutOfRange(point: Point) {
    return this.checkIfPointIsOutOfRangeLeft(point)
      || this.checkIfPointIsOutOfRangeRight(point)
      || this.checkIfPointIsOutOfRangeBottom(point);
  }

  checkIfPointIsOutOfRangeLeft(point: Point) {
    return point.x < 0;
  }

  checkIfPointIsOutOfRangeRight(point: Point) {
    return point.x > this.size.width - 1;
  }

  checkIfPointIsOutOfRangeBottom(point: Point) {
    return point.y < 0;
  }
}
