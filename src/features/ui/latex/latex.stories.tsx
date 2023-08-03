import type { Meta, StoryObj } from '@storybook/react';

import { Latex } from './latex';

const meta: Meta<typeof Latex> = {
  component: Latex,
  decorators: [
    (Story) => (
      <p className="bg-gray-100 p-4">
        The following story <Story /> is wrapped in a paragraph with a gray background to show the
        difference between the inline and block modes.
      </p>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Latex>;

export const Inline = {
  args: {
    latex: '\\sqrt{2}',
    displayMode: false,
  },
} satisfies Story;

export const Block = {
  args: {
    latex: '\\sqrt{2}',
    displayMode: true,
  },
} satisfies Story;
