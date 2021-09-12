import { Color } from 'src/components/Cell/types';
import { Type } from 'src/components/Tetromino/types';
import { BrickContext } from '../BrickContext';

export type Options = {
  type: Type;
  color: Color;
  brickContext: BrickContext;
};
