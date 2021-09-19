import { omit, sample } from 'lodash';
import { makeAutoObservable } from 'mobx';
import { colors } from '../../components/Cell/constants';
import { Color } from '../../components/Cell/types';
import { types } from '../../components/Tetromino/constants';
import { Type } from '../../components/Tetromino/types';

export class TetrominoGenerator {
  private _currentData: { color: Color; type: Type } | null = null;

  private _nextData: { color: Color; type: Type } | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get currentData() {
    return this._currentData;
  }

  get nextData() {
    return this._nextData;
  }

  create() {
    this._currentData = this.getRandomData();
    this._nextData = this.getRandomData();
  }

  generateNext() {
    this._currentData = this.nextData;
    this._nextData = this.getRandomData();
  }

  private getRandomData() {
    return {
      color: sample(omit(colors, 'empty'))!,
      type: sample(types)!,
    };
  }
}
