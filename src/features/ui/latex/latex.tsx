import katex from 'katex';
import { forwardRef, useMemo } from 'react';

import type { LatexProps } from './latex.types';

export const InlineLatex = forwardRef<HTMLSpanElement, LatexProps>(
  ({ latex, className, ...props }, ref) => {
    const html = useMemo(
      () =>
        katex.renderToString(latex, {
          displayMode: false,
          errorColor: '#ef4444',
          macros: {},
          throwOnError: false,
        }),
      [latex],
    );
    return (
      <span
        data-testid="latex"
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
        ref={ref}
        {...props}
      />
    );
  },
);
InlineLatex.displayName = 'InlineLatex';

export const BlockLatex = forwardRef<HTMLDivElement, LatexProps>(
  ({ latex, className, ...props }, ref) => {
    const html = useMemo(
      () =>
        katex.renderToString(latex, {
          displayMode: true,
          errorColor: '#ef4444',
          macros: {},
          throwOnError: false,
        }),
      [latex],
    );
    return (
      <div
        data-testid="latex"
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
        ref={ref}
        {...props}
      />
    );
  },
);
BlockLatex.displayName = 'BlockLatex';
