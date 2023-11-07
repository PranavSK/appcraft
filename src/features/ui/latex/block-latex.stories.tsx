import type { Meta, StoryObj } from '@storybook/react';

import { BlockLatex } from './latex';

const meta: Meta<typeof BlockLatex> = {
  component: BlockLatex,
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
type Story = StoryObj<typeof BlockLatex>;

export const Block = {
  args: {
    latex: '\\sqrt{2}',
  },
} satisfies Story;
