import { makeAutoObservable } from 'mobx';
import { isEqual, range } from 'lodash';
import { Point } from '../../types';
import { Cell } from '../Cell';
import { Options } from './types';

export class Field {
  private _cells: Cell[];

  constructor(options: Options) {
    makeAutoObservable(this, {}, { autoBind: true });

    this._cells = range(options.height).map((y) => range(options.width).map((x) => new Cell({ point: { x, y } }))).flat();
  }

  get cells() {
    return this._cells;
  }

  getCellByPoint(point: Point) {
    const cell = this._cells.find((c) => isEqual(c.point, point));

    if (!cell) {
      throw new Error(`${this.constructor.name}: invalid point value provided`);
    }

    return cell;
  }
}
