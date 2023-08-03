import { useAtomValue } from 'jotai';
import { FC } from 'react';

import { ChildrenNode } from '#/features/nodes/common';
import { Widget } from '#/features/ui/widget';
import { cn } from '#/lib/utils';

import type { NodeProps } from '../node.types';
import { getStore } from './store';

export const Component: FC<NodeProps> = ({ id, className }) => {
  const state = useAtomValue(getStore(id));
  return (
    <Widget {...state} className={cn(className, 'text-center')}>
      <ChildrenNode id={id} />
    </Widget>
  );
};
