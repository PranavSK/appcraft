import type { Meta, StoryObj } from '@storybook/react';

import { InlineLatex } from './latex';

const meta: Meta<typeof InlineLatex> = {
  component: InlineLatex,
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
type Story = StoryObj<typeof InlineLatex>;

export const Inline = {
  args: {
    latex: '\\sqrt{2}',
  },
} satisfies Story;
