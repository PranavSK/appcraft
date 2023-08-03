import type { Meta, StoryObj } from '@storybook/react';

import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const WithBar = {} satisfies Story;
