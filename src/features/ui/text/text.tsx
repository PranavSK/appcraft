import { forwardRef } from 'react';

import { cn } from '#/lib/utils';

import type { TextProps } from './text.types';

export const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ className, text, color, highlightColor, children, ...props }, ref) => {
    return (
      <span
        data-testid="text"
        style={{ color, backgroundColor: highlightColor }}
        className={cn(highlightColor && 'rounded-md p-1', className)}
        ref={ref}
        {...props}
      >
        {text ?? children}
      </span>
    );
  },
);
Text.displayName = 'Text';

// TODO: Need to add standard color options from Radix colors
// TODO: Need to add more marks like bold, italic, underline, etc.
