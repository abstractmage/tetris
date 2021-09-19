import React from 'react';
import { BoxContainerProps } from './types';
import style from './index.module.scss';

export const BoxContainer = (props: BoxContainerProps) => {
  const { text, children } = props;

  return (
    <div className={style.main}>
      {text && <div className={style.text}>{text}</div>}
      <div className={style.boxContainer}>{children}</div>
    </div>
  );
};
