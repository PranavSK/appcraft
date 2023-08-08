import type { Meta, StoryObj } from '@storybook/react';
import { map, pipe, range } from 'remeda';

import { Slider } from './slider';

const meta: Meta<typeof Slider> = {
  component: Slider,
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    orientation: 'horizontal',
  },
} satisfies Story;

export const Vertical = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    orientation: 'vertical',
    showFill: true,
  },
} satisfies Story;

export const Large = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    orientation: 'horizontal',
    size: 'lg',
  },
} satisfies Story;

export const WithMarks = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    orientation: 'horizontal',
    size: 'lg',
    marks: pipe(
      0,
      range(11),
      map((n) => n * 10),
    ),
  },
} satisfies Story;
