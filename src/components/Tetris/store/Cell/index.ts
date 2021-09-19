import { makeAutoObservable } from 'mobx';
import { colors } from '../../components/Cell/constants';
import { Color } from '../../components/Cell/types';
import { Point } from '../../types';
import { Options } from './types';

export class Cell {
  private _point: Point;

  private _color: Color = colors.empty;

  constructor(options: Options) {
    makeAutoObservable(this, {}, { autoBind: true });

    this._point = options.point;
  }

  get point() {
    return this._point;
  }

  get color() {
    return this._color;
  }

  changeColor(color: Color) {
    this._color = color;
  }
}
