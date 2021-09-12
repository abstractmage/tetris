import React from 'react';
import { GlobalProps } from './types';
import './index.module.scss';

export const Global = (props: GlobalProps) => {
  const { children } = props;
  return <>{children}</>;
};
