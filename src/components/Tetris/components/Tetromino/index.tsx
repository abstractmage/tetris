import React from 'react';
import cn from 'classnames';
import { range } from 'lodash';
import { defaultProps, numberOfCells } from './constants';
import { TetrominoProps } from './types';
import style from './index.module.scss';
import { Cell } from '../Cell';

export const Tetromino = (props: TetrominoProps) => {
  const { type, color } = { ...defaultProps, ...props };

  return (
    <div className={cn(style.main, style[`main_type_${type}`])}>
      <div className={style.inner}>
        {range(numberOfCells).map((index) => (
          <div key={index} className={style.cell}>
            <Cell color={color} />
          </div>
        ))}
      </div>
    </div>
  );
};
