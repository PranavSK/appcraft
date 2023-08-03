import type { HTMLAttributes } from 'react';

export interface WidgetProps extends HTMLAttributes<HTMLDivElement> {
  rowStart: number;
  rowEnd: number;
  columnStart: number;
  columnEnd: number;
  asChild?: boolean;
}
