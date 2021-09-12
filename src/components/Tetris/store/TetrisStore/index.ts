import { makeAutoObservable } from 'mobx';
import { colors } from 'src/components/Cell/constants';
import { Size } from '../../types';
import { BrickContext } from '../BrickContext';
import { BrickHeap } from '../BrickHeap';
import { Field } from '../Field';
import { KeyController } from '../KeyController';
import { TetrominoCreator } from '../TetrominoCreator';

export class TetrisStore {
  private _field = new Field(TetrisStore.fieldSize);

  private brickContext = new BrickContext({ size: { width: 10, height: 20 } });

  private brickHeap = new BrickHeap({ brickContext: this.brickContext });

  private tetrominoCreator = new TetrominoCreator({ brickContext: this.brickContext });

  private keyController = new KeyController();

  private static fieldSize: Size = { width: 10, height: 20 };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    console.log(this);
  }

  get field() {
    return this._field;
  }

  start() {
    const tetromino = this.tetrominoCreator.createRandom();

    this.keyController.startListening({
      onArrowUpPress: () => {
        tetromino.rotateRight();
        this.draw();
      },
      onArrowDownPress: () => {
        tetromino.moveDown();
        this.draw();
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
}
