import { makeAutoObservable } from 'mobx';
import { types } from '../../components/Tetromino/constants';
import { Type } from '../../components/Tetromino/types';
import { Point } from '../../types';
import { Brick } from '../Brick';
import { BrickContext } from '../BrickContext';
import { Options } from './types';

export class Tetromino {
  bricks: Brick[];

  type: Type;

  private brickContext: BrickContext;

  private pivotBrick!: Brick;

  constructor(options: Options) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.type = options.type;
    this.brickContext = options.brickContext;
    this.bricks = this.createPoints(this.brickContext.startPoint).map((point, i) => {
      const brick = new Brick({ point, color: options.color });
      if (i === 0) this.pivotBrick = brick;
      return brick;
    });

    this.brickContext.addBricks(...this.bricks);
  }
  
  isMovingDownPossible() {
    const nextPoints = this.getMovingDownNextPoints();
    return this.isMovingToPointsPossible(...nextPoints);
  }

  isMovingRightPossible() {
    const nextPoints = this.getMovingRightNextPoints();
    return this.isMovingToPointsPossible(...nextPoints);
  }

  isMovingLeftPossible() {
    const nextPoints = this.getMovingLeftNextPoints();
    return this.isMovingToPointsPossible(...nextPoints);
  }

  isRotatingRightPossible() {
    const nextPoints = this.getRotatingRightNextPoints();
    return this.isMovingToPointsPossible(...nextPoints);
  }

  isRotatingLeftPossible() {
    const nextPoints = this.getRotatingLeftNextPoints();
    return this.isMovingToPointsPossible(...nextPoints);
  }

  moveDown() {
    if (!this.isMovingDownPossible()) return;
    const nextPoints = this.getMovingDownNextPoints();
    this.bricks.forEach((brick, i) => brick.setPoint(nextPoints[i]));
  }

  moveRight() {
    if (!this.isMovingRightPossible()) return;
    const nextPoints = this.getMovingRightNextPoints();
    this.bricks.forEach((brick, i) => brick.setPoint(nextPoints[i]));
  }

  moveLeft() {
    if (!this.isMovingLeftPossible()) return;
    const nextPoints = this.getMovingLeftNextPoints();
    this.bricks.forEach((brick, i) => brick.setPoint(nextPoints[i]));
  }

  rotateRight() {
    if (!this.isRotatingRightPossible() || this.type === types.O) return;
    const nextPoints = this.getRotatingRightNextPoints();
    this.bricks.forEach((brick, i) => brick.setPoint(nextPoints[i]));
  }

  rotateLeft() {
    if (!this.isRotatingLeftPossible() || this.type === types.O) return;
    const nextPoints = this.getRotatingLeftNextPoints();
    this.bricks.forEach((brick, i) => brick.setPoint(nextPoints[i]));
  }

  private createPoints(pivotPoint: Point) {
    if (this.type === 'I') {
      return [
        pivotPoint,
        { x: pivotPoint.x - 2, y: pivotPoint.y },
        { x: pivotPoint.x - 1, y: pivotPoint.y },
        { x: pivotPoint.x + 1, y: pivotPoint.y },
      ] as Point[];
    }

    if (this.type === 'J') {
      return [
        pivotPoint,
        { x: pivotPoint.x - 1, y: pivotPoint.y + 1 },
        { x: pivotPoint.x - 1, y: pivotPoint.y },
        { x: pivotPoint.x + 1, y: pivotPoint.y },
      ] as Point[];
    }

    if (this.type === 'L') {
      return [
        pivotPoint,
        { x: pivotPoint.x - 1, y: pivotPoint.y },
        { x: pivotPoint.x + 1, y: pivotPoint.y },
        { x: pivotPoint.x + 1, y: pivotPoint.y + 1 },
      ] as Point[];
    }

    if (this.type === 'O') {
      return [
        pivotPoint,
        { x: pivotPoint.x - 1, y: pivotPoint.y + 1 },
        { x: pivotPoint.x , y: pivotPoint.y + 1 },
        { x: pivotPoint.x - 1, y: pivotPoint.y },
      ] as Point[];
    }

    if (this.type === 'S') {
      return [
        pivotPoint,
        { x: pivotPoint.x - 1, y: pivotPoint.y },
        { x: pivotPoint.x , y: pivotPoint.y + 1 },
        { x: pivotPoint.x + 1 , y: pivotPoint.y + 1 },
      ] as Point[];
    }

    if (this.type === 'T') {
      return [
        pivotPoint,
        { x: pivotPoint.x - 1, y: pivotPoint.y },
        { x: pivotPoint.x + 1, y: pivotPoint.y },
        { x: pivotPoint.x, y: pivotPoint.y + 1 },
      ] as Point[];
    }

    return [
      pivotPoint,
      { x: pivotPoint.x - 1, y: pivotPoint.y + 1 },
      { x: pivotPoint.x, y: pivotPoint.y + 1 },
      { x: pivotPoint.x + 1, y: pivotPoint.y },
    ] as Point[];
  }

  private isMovingToPointsPossible(...points: Point[]) {
    return points.every((point) => {
      if (this.brickContext.checkIfPointIsOutOfRange(point)) return false;

      if (!this.brickContext.checkIfBrickAtPoint(point)) return true;

      const brickAtPoint = this.brickContext.getBrickByPoint(point);

      return this.bricks.includes(brickAtPoint);
    });
  }

  private getMovingDownNextPoints() {
    return this.bricks.map((brick) => ({ x: brick.point.x, y: brick.point.y - 1 }));
  }

  private getMovingRightNextPoints() {
    return this.bricks.map((brick) => ({ x: brick.point.x + 1, y: brick.point.y }));
  }

  private getMovingLeftNextPoints() {
    return this.bricks.map((brick) => ({ x: brick.point.x - 1, y: brick.point.y }));
  }

  private getRotatingRightNextPoints() {
    return this.bricks.map((brick) => this.getRotatedPoint(this.pivotBrick.point, brick.point, -90));
  }

  private getRotatingLeftNextPoints() {
    return this.bricks.map((brick) => this.getRotatedPoint(this.pivotBrick.point, brick.point, +90));
  }

  private getRotatedPoint(originPoint: Point, point: Point, angle: number) {
    const x = Math.round(originPoint.x + Math.cos(angle * (Math.PI / 180)) * (point.x - originPoint.x) - Math.sin(angle * (Math.PI / 180)) * (point.y - originPoint.y));
    const y = Math.round(originPoint.y + Math.sin(angle * (Math.PI / 180)) * (point.x - originPoint.x) + Math.cos(angle * (Math.PI / 180)) * (point.y - originPoint.y));
    return { x, y };
  }
}
