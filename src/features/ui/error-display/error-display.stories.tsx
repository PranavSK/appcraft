import type { Meta, StoryObj } from '@storybook/react';

import { ErrorDisplay } from './error-display';

const meta: Meta<typeof ErrorDisplay> = {
  component: ErrorDisplay,
};
export default meta;
type Story = StoryObj<typeof ErrorDisplay>;

export const Default = {
  args: {
    statusCode: '404',
    message: 'Page not found',
  },
} satisfies Story;
