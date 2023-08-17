import { cva } from 'class-variance-authority';
import { useAtomValue } from 'jotai';
import { type FC } from 'react';

import { ChildrenNode } from '#/features/nodes/common/components';
import { Widget } from '#/features/ui/widget';

import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

const containerVariants = cva('flex items-center justify-center', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export const Component: FC<NodeProps> = ({ id, className }) => {
  const { rowStart, rowEnd, columnStart, columnEnd } = useAtomValue(nodeStateAtomFamily(id));
  const orientation = rowEnd - rowStart > columnEnd - columnStart ? 'vertical' : 'horizontal';

  return (
    <Widget
      className={containerVariants({ className, orientation })}
      {...{ rowStart, rowEnd, columnStart, columnEnd }}
    >
      <ChildrenNode id={id} />
    </Widget>
  );
};
