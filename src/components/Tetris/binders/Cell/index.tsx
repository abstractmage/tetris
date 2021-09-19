import React from 'react';
import { observer } from 'mobx-react';
import { Cell as FieldCell } from '../../components/Field/components/Cell';
import { Cell as CellView } from '../../components/Cell';
import { CellProps } from './types';

export const Cell = observer(function Cell(props: CellProps) {
  const { cell } = props;

  return (
    <FieldCell>
      <CellView color={cell.color} />
    </FieldCell>
  )
});
