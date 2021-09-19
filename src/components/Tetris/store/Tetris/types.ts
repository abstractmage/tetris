import { ClearRowsHandler, FinishHandler, PauseHandler, RunHandler } from '../GameScenario/types';

export type Options = {
  onRun?: RunHandler;
  onPause?: PauseHandler;
  onClearRows?: ClearRowsHandler;
  onFinish?: FinishHandler;
};
