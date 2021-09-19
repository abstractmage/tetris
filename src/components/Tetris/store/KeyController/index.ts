import SwipeListener from 'swipe-listener';

export class KeyController {
  private onLeft: null | (() => void) = null;

  private onRight: null | (() => void) = null;

  private onUp: null | (() => void) = null;

  private onDown: null | (() => void) = null;

  constructor() {
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    SwipeListener(document.body);
  }

  setListeners(callbacks: {
    onLeft: (() => void);
    onRight: (() => void);
    onUp: (() => void);
    onDown: (() => void);
  }) {
    this.onLeft = callbacks.onLeft;
    this.onRight = callbacks.onRight;
    this.onUp = callbacks.onUp;
    this.onDown = callbacks.onDown;
  }

  startListening() {
    this.stopListening();
    document.body.addEventListener('keydown', this.handleKeyPress);
    document.body.addEventListener('swipe', this.handleSwipe);
  }

  stopListening() {
    document.body.removeEventListener('keydown', this.handleKeyPress);
    document.body.removeEventListener('swipe', this.handleSwipe);
  }

  private handleKeyPress(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') this.onUp?.();
    if (e.key === 'ArrowDown') this.onDown?.();
    if (e.key === 'ArrowLeft') this.onLeft?.();
    if (e.key === 'ArrowRight') this.onRight?.();
  }

  private handleSwipe(e: any) {
    if (e.detail.directions.left) {
      this.onLeft?.();
    }

    if (e.detail.directions.right) {
      this.onRight?.();
    }

    if (e.detail.directions.top) {
      this.onUp?.();
    }

    if (e.detail.directions.bottom) {
      this.onDown?.();
    }
  }
}