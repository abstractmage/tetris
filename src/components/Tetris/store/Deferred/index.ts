export class Deferred<T = void> {
  private _resolve!: (value: T | PromiseLike<T>) => void;

  private _reject!: (reason?: any) => void;
  
  private _promise = new Promise<T>((resolve, reject) => {
    this._resolve = resolve;
    this._reject = reject;
  });

  get promise() {
    return this._promise;
  }

  resolve(value: T) {
    this._resolve(value);
  }

  reject(reason?: any) {
    this._reject(reason);
  }
}
