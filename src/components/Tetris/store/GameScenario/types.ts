import { BrickContext } from '../BrickContext';
import { BrickHeap } from '../BrickHeap';
import { Field } from '../Field';
import { TetrominoGenerator } from '../TetrominoGenerator';

export type RunHandler = () => void;
export type PauseHandler = () => void;
export type ClearRowsData = { numberOfRows: number };
export type ClearRowsHandler = (data: ClearRowsData) => void;
export type FinishHandler = () => void;

export type State = 'initial' | 'running' | 'paused' | 'finished';

export type Options = {
  field: Field;
  brickContext: BrickContext;
  brickHeap: BrickHeap;
  tetrominoGenerator: TetrominoGenerator;
  onRun?: RunHandler;
  onPause?: PauseHandler;
  onClearRows?: ClearRowsHandler;
  onFinish?: FinishHandler;
};
