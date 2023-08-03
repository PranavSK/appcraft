import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';

import { cn } from '#/lib/utils';

import type { ButtonProps } from './button.types';
import { buttonVariants } from './button.variants';

/**
 * Displays a button or a component that looks like a button.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        data-testid="button"
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
