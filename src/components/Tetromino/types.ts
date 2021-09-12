import { Color as CellColor } from '../Cell/types';

export type Color = CellColor;

export type Type = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

export type TetrominoProps = {
  color?: Color;
  type?: Type;
};
