import { Meta, Story } from '@storybook/react';
import { values } from 'lodash';
import { Cell as CellView } from '.';
import { colors, defaultProps } from './constants';
import { CellProps } from './types';

export const Cell: Story<CellProps> = (props) => (
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
      <CellView {...props} />
    </div>
  </div>
);
Cell.args = {
  ...defaultProps,
};

export default {
  title: 'Components/Cell',
  component: Cell,
  argTypes: {
    color: {
      control: 'inline-radio',
      options: values(colors),
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;
