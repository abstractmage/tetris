import { State } from './types';

export const states: { [state in State]: state } = {
  'initial': 'initial',
  'running': 'running',
  'paused': 'paused',
  'finished': 'finished',
};