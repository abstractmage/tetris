import React from 'react';
import cn from 'classnames';
import { defaultProps } from './constants';
import { CellProps } from './types';
import style from './index.module.scss';

export const Cell = (props: CellProps) => {
  const { color } = { ...defaultProps, ...props };

  return <div className={cn(style.main, style[`main_color_${color}`])}>
    <div className={style.innerSquare} />
    <div className={style.outerSquare} />
  </div>
};
