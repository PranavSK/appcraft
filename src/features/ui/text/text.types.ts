import type { HTMLAttributes } from 'react';

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {
  text?: string;
  color?: string;
  highlightColor?: string;
}
