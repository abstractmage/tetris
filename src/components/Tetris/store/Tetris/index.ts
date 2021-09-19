import { Size } from '../../types';
import { BrickContext } from '../BrickContext';
import { BrickHeap } from '../BrickHeap';
import { Field } from '../Field';
import { GameScenario } from '../GameScenario';
import { TetrominoGenerator } from '../TetrominoGenerator';
import { Options } from './types';

export class Tetris {
  private _field = new Field(Tetris.defaultFieldSize);

  private brickContext = new BrickContext({ size: { width: 10, height: 20 } });
  
  private brickHeap = new BrickHeap({ brickContext: this.brickContext });

  private tetrominoGenerator = new TetrominoGenerator();

  private gameScenario: GameScenario;
  
  private static defaultFieldSize: Size = { width: 10, height: 20 };

  constructor(options?: Options) {
    this.gameScenario = new GameScenario({
      field: this._field,
      brickContext: this.brickContext,
      brickHeap: this.brickHeap,
      tetrominoGenerator: this.tetrominoGenerator,
      onRun: options?.onRun,
      onPause: options?.onPause,
      onClearRows: options?.onClearRows,
      onFinish: options?.onFinish,
    });
  }

  get field() {
    return this._field;
  }

  get nextPieceData() {
    return this.tetrominoGenerator.nextData;
  }

  run() {
    this.gameScenario.run();
  }

  pause() {
    this.gameScenario.pause();
  }
}
