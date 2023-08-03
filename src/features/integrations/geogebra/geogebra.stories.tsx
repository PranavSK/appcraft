import type { Meta, StoryObj } from '@storybook/react';

import { Geogebra } from './geogebra';

const meta: Meta<typeof Geogebra> = {
  component: Geogebra,
};
export default meta;
type Story = StoryObj<typeof Geogebra>;

export const Default = {
  args: {
    materialId: 'jusnnrwa',
  },
} satisfies Story;
