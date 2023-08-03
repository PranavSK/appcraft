import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './text';

const meta: Meta<typeof Text> = {
  component: Text,
};
export default meta;
type Story = StoryObj<typeof Text>;

export const Default = {
  args: {
    text: 'Hello World',
  },
} satisfies Story;

export const WithColor = {
  args: {
    text: 'Hello World',
    color: 'red',
  },
} satisfies Story;
