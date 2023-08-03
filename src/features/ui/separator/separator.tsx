import { Root } from '@radix-ui/react-separator';
import { forwardRef } from 'react';

import { cn } from '#/lib/utils';

import type { SeparatorProps, SeparatorRef } from './separator.types';

export const Separator = forwardRef<SeparatorRef, SeparatorProps>(
  ({ decorative = true, orientation = 'horizontal', className, ...props }, ref) => {
    return (
      <Root
        data-testid="separator"
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          'shrink-0 bg-border',
          orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
          className,
        )}
        {...props}
      />
    );
  },
);
Separator.displayName = 'Separator';
