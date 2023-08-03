import type { Meta, StoryObj } from '@storybook/react';

import { Image } from './image';

const meta: Meta<typeof Image> = {
  component: Image,
};
export default meta;
type Story = StoryObj<typeof Image>;

export const Default = {
  args: {
    src: 'https://picsum.photos/seed/picsum/200/300',
  },
} satisfies Story;
