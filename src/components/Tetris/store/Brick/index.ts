import { makeAutoObservable } from 'mobx';
import { Color } from 'src/components/Cell/types';
import { Point } from '../../types';
import { Options } from './types';

export class Brick {
  point: Point;

  color: Color;

  constructor(options: Options) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.point = options.point;
    this.color = options.color;
  }
  
  setPoint(point: Point) {
    this.point = point;
  }
}