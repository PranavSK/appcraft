import type { Meta, StoryObj } from '@storybook/react';

import { Widget } from './widget';
import { WidgetGrid } from './widget-grid';

const meta: Meta<typeof Widget> = {
  component: Widget,
  decorators: [
    (Story) => (
      <WidgetGrid className="h-[680px] w-[680px]">
        <Story />
      </WidgetGrid>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Widget>;

export const Default = {
  args: {
    rowStart: 1,
    rowEnd: 3,
    columnStart: 1,
    columnEnd: 3,
  },
} satisfies Story;
