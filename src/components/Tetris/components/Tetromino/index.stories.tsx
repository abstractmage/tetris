import { Meta, Story } from '@storybook/react';
import { values } from 'lodash';
import { colors, defaultProps, types } from './constants';
import { TetrominoProps } from './types';
import { Tetromino as TetrominoView } from '.';

export const Tetromino: Story<TetrominoProps> = (props) => (
  <div 
    style={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div style={{ width: 200, height: 200 }}>
      <TetrominoView {...props} />
    </div>
  </div>
);

Tetromino.args = {
  ...defaultProps,
};

export default {
  title: 'Components/Tetromino',
  component: Tetromino,
  argTypes: {
    type: {
      control: 'inline-radio',
      options: values(types),
    },
    color: {
      control: 'inline-radio',
      options: values(colors),
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;
