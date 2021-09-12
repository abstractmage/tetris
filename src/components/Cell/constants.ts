import { Color } from './types';

export const colors: { [name in Color]: Color } = {
  empty: 'empty',
  purple: 'purple',
  green: 'green',
  red: 'red',
  yellow: 'yellow',
  lightBlue: 'lightBlue',
  orange: 'orange',
  blue: 'blue',
};

export const defaultProps = {
  color: colors.empty,
};
