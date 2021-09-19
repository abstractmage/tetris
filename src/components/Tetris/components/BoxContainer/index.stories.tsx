import { Meta, Story } from '@storybook/react';
import { BoxContainer as BoxContainerView } from '.';
import { BoxContainerProps } from './types';

export const BoxContainer: Story<BoxContainerProps> = (props) => (
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
    <div style={{ width: 150, height: 189 }}>
      <BoxContainerView {...props} />
    </div>
  </div>
);

BoxContainer.args = {
  text: 'NEXT PIECE',
};

export default {
  title: 'Components/Box Container',
  component: BoxContainer,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;
