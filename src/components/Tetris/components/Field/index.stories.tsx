import { Meta, Story } from '@storybook/react';
import { range } from 'lodash';
import { Global } from 'src/components/Global';
import { Cell } from '../Cell';
import { Cell as FieldCell } from './components/Cell';
import { Field as FieldView } from '.';

const numberOfFieldCells = 200;

export const Field: Story<{}> = () => (
  <Global>
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
      <FieldView>
        {range(numberOfFieldCells).map((index) => (
          <FieldCell key={index}>
            <Cell />
          </FieldCell>
        ))}
      </FieldView>
    </div>
  </Global>
);

export default {
  title: 'Components/Field',
  component: Field,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;
