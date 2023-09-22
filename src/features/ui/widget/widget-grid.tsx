import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '#/lib/utils';

export const WidgetGrid = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn('grid grid-cols-6 grid-rows-applet gap-5', className)}
        ref={ref}
        {...props}
      />
    );
  },
);
WidgetGrid.displayName = 'WidgetGrid';
