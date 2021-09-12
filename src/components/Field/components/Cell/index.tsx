import React from 'react';
import { CellProps } from './types';
import style from './index.module.scss';

export const Cell = (props: CellProps) => {
  const { children } = props;
  return <div className={style.main}>{children}</div>
};
