import type { Meta, StoryObj } from '@storybook/react';
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '#/features/ui/button';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './index';

const meta: Meta<typeof Collapsible> = {
  component: Collapsible,
};
export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Sample: Story = {
  render: function Sample() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">
            List of items {isOpen ? 'expanded' : 'contracted'}
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">Item 1</div>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 font-mono text-sm">Item 2</div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">Item 3</div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
