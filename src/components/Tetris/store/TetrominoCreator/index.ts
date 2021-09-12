import { sample, values } from 'lodash';
import { colors } from 'src/components/Cell/constants';
import { types } from 'src/components/Tetromino/constants';
import { BrickContext } from '../BrickContext'
import { Tetromino } from '../Tetromino';
import { Options } from './types';

export class TetrominoCreator {
  private brickContext: BrickContext;

  constructor(options: Options) {
    this.brickContext = options.brickContext;
  }

  createRandom() {
    const type = sample(values(types))!;
    const color = sample(values(colors).filter((c) => c !== colors.empty))!;
    return new Tetromino({ type, color, brickContext: this.brickContext });
  }
}
