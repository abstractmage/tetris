import { colors } from '../../components/Cell/constants';
import { BrickContext } from '../BrickContext';
import { BrickHeap } from '../BrickHeap';
import { Deferred } from '../Deferred';
import { Field } from '../Field';
import { Interval } from '../Interval';
import { KeyController } from '../KeyController';
import { Tetromino } from '../Tetromino';
import { TetrominoGenerator } from '../TetrominoGenerator';
import { states } from './constants';
import { ClearRowsHandler, FinishHandler, Options, PauseHandler, RunHandler, State } from './types';

export class GameScenario {
  private state: State = states.initial;

  private falling = false;

  private numberOfFilledLines = 0;
  
  private brickContext: BrickContext;

  private brickHeap: BrickHeap;

  private field: Field;

  private tetrominoGenerator: TetrominoGenerator;
  
  private currentTetromino: Tetromino | null = null;

  private interval = new Interval();

  private keyController = new KeyController();

  private pauseDeferred: Deferred | null = null;

  private onRun: RunHandler | null = null

  private onPause: PauseHandler | null = null;

  private onClearRows: ClearRowsHandler | null = null;

  private onFinish: FinishHandler | null = null;

  constructor(options: Options) {
    this.field = options.field;
    this.brickContext = options.brickContext;
    this.brickHeap = options.brickHeap;
    this.tetrominoGenerator = options.tetrominoGenerator;
    this.onRun = options.onRun ?? null;
    this.onPause = options.onPause ?? null;
    this.onClearRows = options.onClearRows ?? null;
    this.onFinish = options.onFinish ?? null;
  }

  async run() {    
    if (this.state === states.paused) {
      this.onRun?.();
      this.resume();
      return;
    }

    if (this.state === states.running) return;

    if (this.state === states.finished) {
      this.brickContext.clear();
      this.brickHeap.clear();
      this.numberOfFilledLines = 0;
      this.draw();
    }

    this.onRun?.();
    this.start();
  }

  pause() {
    if (this.state === states.paused) return;

    this.onPause?.();
    this.state = states.paused;
    this.pauseDeferred = new Deferred();
    this.keyController.stopListening();
    this.interval.stop();
  }

  private async start() {
    this.state = states.running;

    this.tetrominoGenerator.create();

    do {
      await this.pauseDeferred?.promise;
      this.currentTetromino = new Tetromino({
        type: this.tetrominoGenerator.currentData!.type,
        color: this.tetrominoGenerator.currentData!.color,
        brickContext: this.brickContext,
      });
      await this.runTetrominoFalling();
      this.tetrominoGenerator.generateNext();
    } while (!this.field.isFilled());

    this.state = states.finished;
    this.onFinish?.();
  }

  private resume() {
    if (this.state !== states.paused) return;

    this.state = states.running;
    this.pauseDeferred?.resolve();
    this.pauseDeferred = null;

    if (this.falling) {
      this.keyController.startListening();
      this.interval.start();
    }
  }

  private async runTetrominoFalling() {
    this.falling = true;
    const tetromino = this.currentTetromino!;

    this.interval.setDuration(
      this.numberOfFilledLines === 100 ? 10 : 1000 - 10 * this.numberOfFilledLines
    );

    await Promise.race([
      new Promise<void>((resolve) => {
        this.keyController.setListeners({
          onArrowUpPress: () => {
            tetromino.rotateRight();
            this.draw();
          },
          onArrowDownPress: () => {
            if (tetromino.isMovingDownPossible()) {
              tetromino.moveDown();
              this.draw();
            } else {
              resolve();
            }
          },
          onArrowRightPress: () => {
            tetromino.moveRight();
            this.draw();
          },
          onArrowLeftPress: () => {
            tetromino.moveLeft();
            this.draw();
          },
        });
        this.keyController.startListening();
      }),
      new Promise<void>((resolve) => {
        this.interval.setCallback(() => {
          if (tetromino.isMovingDownPossible()) {
            tetromino.moveDown();
            this.draw();
          } else {
            resolve();
          }
        });
        this.interval.start();
      }),
    ]);

    this.falling = false;
    this.keyController.stopListening();
    this.interval.stop();
    this.brickHeap.addBricks(...tetromino.bricks);
    await this.clearRowsIfNeeded();
  }

  private draw() {
    this.field.cells.forEach((cell) => {
      if (this.brickContext.checkIfBrickAtPoint(cell.point)) {
        const brick = this.brickContext.getBrickByPoint(cell.point);
        cell.changeColor(brick.color);
        return;
      }

      cell.changeColor(colors.empty);
    });
  }

  private async clearRowsIfNeeded() {
    const rows = this.brickHeap.getFilledRows()
      .map((bricks) => bricks.sort((prev, next) => prev.point.x - next.point.x));

    if (rows.length === 0) return;

    this.numberOfFilledLines += rows.length;
    this.onClearRows?.({ numberOfRows: rows.length });

    const rowWidth = this.brickContext.size.width;

    for (let x = rowWidth / 2 - 1; x >= 0; x--) {
      const leftX = x;
      const rightX = rowWidth - leftX - 1;

      rows.forEach((rowBricks) => {
        const leftBrick = rowBricks[leftX];
        const rightBrick = rowBricks[rightX];
        this.brickContext.removeBricks(leftBrick, rightBrick);
        this.brickHeap.removeBricks(leftBrick, rightBrick);
      });

      this.draw();

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    this.brickHeap.moveToBottom();
    this.draw();
  }
}
