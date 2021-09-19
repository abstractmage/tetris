import React from 'react';
import { FieldProps } from './types';
import style from './index.module.scss';

export const Field = (props: FieldProps) => {
  const { children } = props;
  return <div className={style.main}>{children}</div>;
};
