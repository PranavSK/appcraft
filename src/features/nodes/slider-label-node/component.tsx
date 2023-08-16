import { type FC } from 'react';

import { ChildrenNode } from '#/features/nodes/common/components';
import { cn } from '#/lib/utils';

import type { NodeProps } from '../node.types';

export const Component: FC<NodeProps> = ({ id, className }) => {
  return (
    <div className={cn('text-center', className)}>
      <ChildrenNode id={id} />
    </div>
  );
};
