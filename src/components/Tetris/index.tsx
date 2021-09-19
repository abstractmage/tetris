import React from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import { Global } from '../Global';
import { Cell } from './binders/Cell';
import { BoxContainer } from './components/BoxContainer';
import { Button } from './components/Button';
import { Field } from './components/Field';
import { Tetromino } from './components/Tetromino';
import { TetrisStore } from './store/TetrisStore';
import style from './index.module.scss';

export const Tetris = observer(function Tetris() {
  const store = useLocalObservable(() => new TetrisStore());

  return (
    <Global>
      <div className={style.main}>
        <div className={style.fieldWrap}>
          <Field>
            {store.field.cells.map((cell) => (
              <Cell key={`${cell.point.x}-${cell.point.y}`} cell={cell} />
            ))}
          </Field>
        </div>
        <div className={style.center}>
          <div className={style.column}>
            <div className={style.nextPieceBoxContainer}>
              <BoxContainer text="NEXT PIECE">
                <div className={style.nextPieceBoxContainerInner}>
                  {store.nextPiece && (
                    <Tetromino
                      type={store.nextPiece.type}
                      color={store.nextPiece.color}
                    />
                  )}
                </div>
              </BoxContainer>
            </div>
            <div>
              <div className={style.fieldText}>SCORES:</div>
              <div className={style.fieldValue}>{store.scores}</div>
            </div>
            <br/>
            <div>
              <div className={style.fieldText}>LINES:</div>
              <div className={style.fieldValue}>{store.lines}</div>
            </div>
            <div className={style.buttonWrap}>
              <Button onClick={store.button.onClick}>{store.button.text}</Button>
            </div>
          </div>
        </div>
      </div>
    </Global>
  );
});
