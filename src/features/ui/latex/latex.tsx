import katex from 'katex';
import { forwardRef, useMemo } from 'react';

import { cn } from '#/lib/utils';

import type { LatexProps } from './latex.types';

export const Latex = forwardRef<HTMLDivElement, LatexProps>(
  ({ latex, displayMode = false, className, ...props }, ref) => {
    const html = useMemo(
      () =>
        katex.renderToString(latex, {
          displayMode: displayMode,
          errorColor: '#ef4444',
          macros: {},
          throwOnError: false,
        }),
      [displayMode, latex],
    );
    return (
      <div
        data-testid="latex"
        className={cn(!displayMode && 'inline', className)}
        dangerouslySetInnerHTML={{ __html: html }}
        ref={ref}
        {...props}
      />
    );
  },
);
Latex.displayName = 'Latex';
