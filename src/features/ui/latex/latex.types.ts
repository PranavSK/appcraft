import { type HTMLAttributes } from 'react';

export interface LatexProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  latex: string;
  displayMode?: boolean;
}
