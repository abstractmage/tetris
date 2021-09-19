import { makeAutoObservable } from 'mobx';
import { Button } from '../Button';
import { states } from '../Button/constants';
import { Counter } from '../Counter';
import { Tetris } from '../Tetris';

export class TetrisStore {
  private tetris = new Tetris({
    onRun: () => this._button.setState(states.pause),
    onPause: () => this._button.setState(states.resume),
    onClearRows: ({ numberOfRows }) => this._counter.incrementLines(numberOfRows),
    onFinish: () => this._button.setState(states.play),
  });

  private _button = new Button({
    onClick: () => {
      if (this._button.state === states.pause) {
        this.tetris.pause();
      } else {
        this.tetris.run();
      }
    },
  });

  private _counter = new Counter();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get field() {
    return this.tetris.field;
  }

  get nextPiece() {
    return this.tetris.nextPieceData;
  }

  get button() {
    return {
      text: this.buttonText,
      onClick: this._button.onClick,
    };
  }

  get scores() {
    return this._counter.scores
  }

  get lines() {
    return this._counter.numberOfLines;
  }

  private get buttonText() {
    if (this._button.state === states.pause) {
      return 'PAUSE';
    }
    
    if (this._button.state === states.resume) {
      return 'RESUME';
    }

    return 'PLAY';
  }
}
