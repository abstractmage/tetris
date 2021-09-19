import React from 'react';
import { ButtonProps } from './types';
import style from './index.module.scss';

export const Button = (props: ButtonProps) => {
  const { children, onClick } = props;
  return <div className={style.main} onClick={onClick}>{children}</div>;
};
