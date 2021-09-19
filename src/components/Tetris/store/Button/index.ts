import { makeAutoObservable } from 'mobx';
import { states } from './constants';
import { State } from './types';

export class Button {
  private _state: State = states.play;

  readonly onClick: () => void;

  constructor(options: {
    onClick: () => void;
  }) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.onClick = options.onClick;
  }

  get state() {
    return this._state;
  }

  setState(state: State) {
    this._state = state;
  }
}