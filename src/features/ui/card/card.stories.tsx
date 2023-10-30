import type { Meta, StoryObj } from '@storybook/react';
import { Check } from 'lucide-react';

import { Button } from '#/features/ui/button';

import { Card } from './card';
import { CardContent } from './card-content';
import { CardDescription } from './card-description';
import { CardFooter } from './card-footer';
import { CardHeader } from './card-header';
import { CardTitle } from './card-title';

const meta: Meta<typeof Card> = {
  component: Card,
};
export default meta;
type Story = StoryObj<typeof Card>;

const notifications = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago',
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago',
  },
  {
    title: 'Your subscription is expiring soon!',
    description: '2 hours ago',
  },
];

export const Sample = {
  args: {
    className: 'w-[380px]',
    children: (
      <>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Check className="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        </CardFooter>
      </>
    ),
  },
} satisfies Story;
