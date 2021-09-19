import { makeAutoObservable } from 'mobx';
import { range } from 'lodash';
import { Point, Size } from '../../types';
import { Cell } from '../Cell';
import { Options } from './types';
import { colors } from '../../components/Cell/constants';

export class Field {
  private _cells: Cell[];

  private size: Size;

  constructor(options: Options) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.size = {
      width: options.width,
      height: options.height,
    };

    this._cells = range(options.height).map((y) => range(options.width).map((x) => new Cell({ point: { x, y } }))).flat();
  }

  get cells() {
    return this._cells;
  }

  getCellByPoint(point: Point) {
    const cell = this._cells.find((c) => c.point.x === point.x && c.point.y === point.y);

    if (!cell) {
      throw new Error(`${this.constructor.name}: invalid point value provided`);
    }

    return cell;
  }

  isFilled() {
    const startCells = this.cells.filter((cell) =>
      cell.point.y === this.size.height - 1,
    );

    return startCells.some((cell) => cell.color !== colors.empty);
  }
}
