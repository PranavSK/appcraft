import { Content, Portal, Root, Trigger } from '@radix-ui/react-popover';
import { forwardRef } from 'react';

import { cn } from '#/lib/utils';

import type { PopoverContentProps, PopoverContentRef } from './popover.types';

export const Popover = Root;

export const PopoverTrigger = Trigger;

export const PopoverContent = forwardRef<PopoverContentRef, PopoverContentProps>(
  ({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
    <Portal>
      <Content
        data-testid="popover-content"
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=top]:slide-in-from-bottom-2',
          className,
        )}
        {...props}
      />
    </Portal>
  ),
);
PopoverContent.displayName = Content.displayName;
