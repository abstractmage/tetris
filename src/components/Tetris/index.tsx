import React from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import { BoxContainer } from '../BoxContainer';
import { Cell } from '../Cell';
import { Field } from '../Field';
import { Cell as FieldCell } from '../Field/components/Cell';
import { Global } from '../Global';
import { Tetromino } from '../Tetromino';
import { TetrisStore } from './store/TetrisStore';
import { nextPieceBoxContainerText } from './constants';
import style from './index.module.scss';

export const Tetris = observer(function Tetris() {
  const store = useLocalObservable(() => new TetrisStore());

  return (
    <Global>
      <div className={style.main}>
        <Field>
          {store.field.cells.map((cell) => (
            <FieldCell key={`${cell.point.x}-${cell.point.y}`}>
              <Cell color={cell.color} />
            </FieldCell>
          ))}
        </Field>
        <div className={style.center}>
          <div className={style.nextPieceBoxContainer}>
            <BoxContainer text={nextPieceBoxContainerText}>
              <div className={style.nextPieceBoxContainerInner}>
                <Tetromino type="S" color="green" />
              </div>
            </BoxContainer>
          </div>
        </div>
      </div>
    </Global>
  );
});
