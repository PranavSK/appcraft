import { useAtomValue } from 'jotai';
import { type FC } from 'react';

import { cn } from '#/lib/utils';

import { ChildrenNode } from '../common/components';
import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

export const Component: FC<NodeProps> = ({ id, className }) => {
  const { showBorder, borderColor, showBackground, backgroundColor } = useAtomValue(
    nodeStateAtomFamily(id),
  );
  return (
    <div
      className={cn('m-auto w-max rounded-xl px-5 py-2', showBorder && 'border-2', className)}
      style={{
        borderColor: showBorder ? borderColor : undefined,
        backgroundColor: showBackground ? backgroundColor : undefined,
      }}
    >
      <ChildrenNode id={id} />
    </div>
  );
};
