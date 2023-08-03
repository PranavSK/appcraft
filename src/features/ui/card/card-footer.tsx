import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '#/lib/utils';

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      data-testid="card-footer"
      ref={ref}
      className={cn(' flex items-center p-6 pt-0', className)}
      {...props}
    />
  ),
);
CardFooter.displayName = 'CardFooter';
