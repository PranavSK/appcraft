import { cva } from 'class-variance-authority';
import { useAtomValue } from 'jotai';
import { FC } from 'react';

import { ChildrenNode } from '#/features/nodes/common/components';
import { Widget } from '#/features/ui/widget';

import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

const paragraphVariants = cva('', {
  variants: {
    textAlign: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    textAlign: 'left',
  },
});

export const Component: FC<NodeProps> = ({ id, className }) => {
  const { textAlign, ...state } = useAtomValue(nodeStateAtomFamily(id));
  return (
    <Widget {...state} className={paragraphVariants({ className, textAlign })}>
      <ChildrenNode id={id} />
    </Widget>
  );
};
