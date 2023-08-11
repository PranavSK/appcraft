import { type FC } from 'react';

import { cn } from '#/lib/utils';

import { ChildrenNode } from '../common';
import type { NodeProps } from '../node.types';

export const Component: FC<NodeProps> = ({ id, className }) => {
  return (
    <div className={cn('text-center', className)}>
      <ChildrenNode id={id} />
    </div>
  );
};
