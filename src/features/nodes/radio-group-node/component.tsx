import { Root } from '@radix-ui/react-radio-group';
import { cva } from 'class-variance-authority';
import { useAtom } from 'jotai';
import { type FC, useCallback } from 'react';

import { useAppletStoreBoundFunction } from '#/features/applet/applet.store';
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
  const [{ value, onValueChange, rowStart, rowEnd, columnStart, columnEnd }, setState] = useAtom(
    nodeStateAtomFamily(id),
  );

  const orientation = rowEnd - rowStart > columnEnd - columnStart ? 'vertical' : 'horizontal';

  const onValueChangeImpl = useAppletStoreBoundFunction('value', onValueChange ?? '');
  const handleValueChange = useCallback(
    (value: string) => {
      setState((state) => ({ ...state, value }));
      onValueChangeImpl(value);
    },
    [onValueChangeImpl, setState],
  );

  return (
    <Root value={value} onValueChange={handleValueChange} orientation={orientation} asChild>
      <Widget
        className={containerVariants({ className, orientation })}
        {...{ rowStart, rowEnd, columnStart, columnEnd }}
      >
        <ChildrenNode id={id} />
      </Widget>
    </Root>
  );
};
