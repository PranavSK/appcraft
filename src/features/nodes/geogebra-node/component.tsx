import { useAtomValue } from 'jotai';
import { FC } from 'react';

import { Geogebra } from '#/features/integrations/geogebra';
import { ChildrenNode } from '#/features/nodes/common/components';
import { Widget } from '#/features/ui/widget';

import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

export const Component: FC<NodeProps> = ({ id, className }) => {
  const { materialId, transparent, ...state } = useAtomValue(nodeStateAtomFamily(id));

  return (
    <Widget className={className} asChild {...state}>
      <Geogebra className="-z-10" id={id} materialId={materialId} transparentGraphics={transparent}>
        <ChildrenNode id={id} />
      </Geogebra>
    </Widget>
  );
};
