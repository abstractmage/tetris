import { makeAutoObservable } from 'mobx';

export class Counter {
  private _numberOfLines = 0;

  private _scores = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get numberOfLines() {
    return this._numberOfLines;
  }

  get scores() {
    return this._scores;
  }

  incrementLines(numberOfNewLines: number) {
    this._numberOfLines += numberOfNewLines;
    
    if (numberOfNewLines === 1) {
      this._scores += 100;
    }

    if (numberOfNewLines === 2) {
      this._scores += 300;
    }

    if (numberOfNewLines === 3) {
      this._scores += 700;
    }

    if (numberOfNewLines === 4) {
      this._scores += 1500;
    }
  }

  clear() {
    this._numberOfLines = 0;
    this._scores = 0;
  }
}
