import { useAtomValue } from 'jotai';
import { type FC } from 'react';

import { WeighingScale } from '#/features/integrations/weighing-scale';
import { Widget } from '#/features/ui/widget';

import { ChildrenNode } from '../common/components';
import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

export const Component: FC<NodeProps> = ({ id, className }) => {
  const { leftValue, rightValue, maxValueDifference, ...state } = useAtomValue(
    nodeStateAtomFamily(id),
  );
  const leftPanContent = <ChildrenNode id={id} filterType={0} />;
  const rightPanContent = <ChildrenNode id={id} filterType={1} />;

  return (
    <Widget className={className} {...state}>
      <WeighingScale
        className="h-full w-full"
        {...{ leftValue, rightValue, maxValueDifference, leftPanContent, rightPanContent }}
      />
    </Widget>
  );
};
