import { Root } from '@radix-ui/react-label';
import { forwardRef } from 'react';

import { cn } from '#/lib/utils';

import type { LabelProps, LabelRef } from './label.types';
import { labelVariants } from './label.variants';

export const Label = forwardRef<LabelRef, LabelProps>(({ className, ...props }, ref) => {
  return (
    <Root data-testid="label" ref={ref} className={cn(labelVariants(), className)} {...props} />
  );
});
Label.displayName = Root.displayName;
