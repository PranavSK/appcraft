import type { Meta, StoryObj } from '@storybook/react';
import { ChevronRight, Loader2, Mail } from 'lucide-react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary = {
  args: {
    children: 'Primary',
  },
} satisfies Story;

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
} satisfies Story;

export const Destructive = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
} satisfies Story;

export const Outline = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
} satisfies Story;

export const Ghost = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
} satisfies Story;

export const Link = {
  args: {
    variant: 'link',
    children: 'Link',
  },
} satisfies Story;

export const Disabled = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
} satisfies Story;

export const Icon = {
  args: {
    variant: 'outline',
    size: 'icon',
    children: <ChevronRight className="h-4 w-4" />,
  },
} satisfies Story;

export const WithIcon = {
  args: {
    children: (
      <>
        <Mail className="mr-2 h-4 w-4" /> Login with Email
      </>
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    disabled: true,
    children: (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </>
    ),
  },
} satisfies Story;

export const AsChild = {
  args: {
    asChild: true,
    children: <a href="/login">Login</a>,
  },
} satisfies Story;
