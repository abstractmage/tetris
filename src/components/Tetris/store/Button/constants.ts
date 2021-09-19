import { State } from './types';

export const states: { [state in State]: state } = {
  play: 'play',
  pause: 'pause',
  resume: 'resume',
};
