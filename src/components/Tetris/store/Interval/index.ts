export class Interval {
  private callback: (() => void) | null = null;

  private duration = 1000;

  private interval: number | null = null;

  setCallback(callback: (() => void) | null) {
    this.callback = callback;
  }

  setDuration(duration: number) {
    this.duration = duration;
  }

  start() {
    this.interval = window.setInterval(() => this.callback?.(), this.duration)
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
