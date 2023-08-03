import { forwardRef } from 'react';

import type { TextProps } from './text.types';

export const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ className, text, color, children, ...props }, ref) => {
    return (
      <span data-testid="text" style={{ color }} className={className} ref={ref} {...props}>
        {text ?? children}
      </span>
    );
  },
);
Text.displayName = 'Text';

// TODO: Need to add standard color options from Radix colors
// TODO: Need to add more marks like bold, italic, underline, etc.
