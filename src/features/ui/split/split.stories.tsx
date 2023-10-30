import type { Meta, StoryObj } from '@storybook/react';

import { Split } from './split';
import { SplitSeparator } from './split.separator';

const meta: Meta<typeof Split> = {
  component: Split,
};
export default meta;
type Story = StoryObj<typeof Split>;

export const Sample = {
  args: {
    className: 'h-80',
    orientation: 'horizontal',
    minPrimarySize: '100px',
    children: (
      <>
        <div className="bg-primary text-primary-foreground">Primary</div>
        <SplitSeparator />
        <div className="bg-secondary text-secondary-foreground">Secondary</div>
      </>
    ),
  },
} satisfies Story;
