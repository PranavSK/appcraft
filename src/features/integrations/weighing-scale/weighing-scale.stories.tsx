import type { Meta, StoryObj } from '@storybook/react';

import { WeighingScale } from './weighing-scale';

const meta: Meta<typeof WeighingScale> = {
  component: WeighingScale,
};
export default meta;
type Story = StoryObj<typeof WeighingScale>;

export const Demo = {
  args: {
    leftValue: 10,
    rightValue: 10,
    maxValueDifference: 20,
    leftPanLabel: <div className="h-full w-full">Left</div>,
  },
} satisfies Story;
