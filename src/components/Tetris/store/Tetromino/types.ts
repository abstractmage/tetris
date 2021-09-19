import { Color } from '../../components/Cell/types';
import { Type } from '../../components/Tetromino/types';
import { BrickContext } from '../BrickContext';

export type Options = {
  type: Type;
  color: Color;
  brickContext: BrickContext;
};
