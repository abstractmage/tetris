import { colors as cellColors } from '../Cell/constants';
import { Type } from './types';

export const colors = cellColors;

export const types: { [name in Type]: Type } = {
  I: 'I',
  J: 'J',
  L: 'L',
  O: 'O',
  S: 'S',
  T: 'T',
  Z: 'Z',
};

export const numberOfCells = 4;

export const defaultProps = {
  type: types.I,
  color: colors.lightBlue,
};
