import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '#/features/ui/input';

import { Label } from './label';

const meta: Meta<typeof Label> = {
  component: Label,
};
export default meta;
type Story = StoryObj<typeof Label>;

export const WithInput = {
  args: {
    htmlFor: 'email',
    children: 'Email',
  },
  decorators: [
    (Story) => (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Story />
        <Input type="email" id="email" placeholder="Email" />
      </div>
    ),
  ],
} satisfies Story;
