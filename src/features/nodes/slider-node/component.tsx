import { useAtom } from 'jotai';
import { type FC, useCallback } from 'react';

import { useAppletStoreBoundFunction } from '#/features/applet/applet.store';
import { ChildrenNode } from '#/features/nodes/common/components';
import { Slider } from '#/features/ui/slider';
import { Widget } from '#/features/ui/widget';
import { cn } from '#/lib/utils';

import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

export const Component: FC<NodeProps> = ({ id, className }) => {
  const [
    {
      value,
      min,
      max,
      step,
      onValueChange,
      onValueCommit,
      rowStart,
      rowEnd,
      columnStart,
      columnEnd,
    },
    setState,
  ] = useAtom(nodeStateAtomFamily(id));

  const orientation =
    Math.abs(rowEnd - rowStart) > Math.abs(columnEnd - columnStart) ? 'vertical' : 'horizontal';

  const onValueChangeImpl = useAppletStoreBoundFunction('value', onValueChange ?? '');
  const onValueCommitImpl = useAppletStoreBoundFunction('value', onValueCommit ?? '');

  const handleValueChange = useCallback(
    (value: number) => {
      setState((state) => ({ ...state, value }));
      onValueChangeImpl(value);
    },
    [onValueChangeImpl, setState],
  );

  const handleValueCommit = useCallback(
    (value: number) => {
      onValueCommitImpl(value);
    },
    [onValueCommitImpl],
  );

  return (
    <Widget
      {...{ rowStart, rowEnd, columnStart, columnEnd }}
      className={cn(className, 'flex flex-col items-center justify-around p-2')}
    >
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        orientation={orientation}
        className="mt-8"
        size="lg"
        showFill={false}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
      >
        <ChildrenNode id={id} slot="slider-mark" />
      </Slider>
      <ChildrenNode id={id} slot="slider-label" />
    </Widget>
  );
};
