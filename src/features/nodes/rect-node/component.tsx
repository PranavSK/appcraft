import { useAtomValue } from 'jotai';
import { type FC } from 'react';

import { Widget } from '#/features/ui/widget';
import { cn } from '#/lib/utils';

import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

export const Component: FC<NodeProps> = ({ id, className }) => {
  const { showFill, fillColor, showBorder, borderColor, ...state } = useAtomValue(
    nodeStateAtomFamily(id),
  );
  return (
    <Widget
      {...state}
      className={cn(className, 'rounded-xl', showBorder && 'border-[0.25rem]')}
      style={{ backgroundColor: showFill ? fillColor : undefined, borderColor: borderColor }}
    />
  );
};
