export class KeyController {
  private onArrowLeftPress: null | (() => void) = null;

  private onArrowRightPress: null | (() => void) = null;

  private onArrowUpPress: null | (() => void) = null;

  private onArrowDownPress: null | (() => void) = null;

  constructor() {
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  startListening(callbacks: {
    onArrowLeftPress: (() => void);
    onArrowRightPress: (() => void);
    onArrowUpPress: (() => void);
    onArrowDownPress: (() => void);
  }) {
    this.stopListening();

    this.onArrowLeftPress = callbacks.onArrowLeftPress;
    this.onArrowRightPress = callbacks.onArrowRightPress;
    this.onArrowUpPress = callbacks.onArrowUpPress;
    this.onArrowDownPress = callbacks.onArrowDownPress;

    document.addEventListener('keydown', this.handleKeyPress)
  }

  stopListening() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  private handleKeyPress(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') this.onArrowUpPress?.();
    if (e.key === 'ArrowDown') this.onArrowDownPress?.();
    if (e.key === 'ArrowLeft') this.onArrowLeftPress?.();
    if (e.key === 'ArrowRight') this.onArrowRightPress?.();
  }
}