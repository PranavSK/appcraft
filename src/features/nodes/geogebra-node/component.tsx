import { useAtomValue } from 'jotai';
import { ComponentRef, FC, useRef } from 'react';

import { Geogebra } from '#/features/integrations/geogebra';
import { Widget } from '#/features/ui/widget';

import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

export const Component: FC<NodeProps> = ({ id, className }) => {
  const ggbRef = useRef<ComponentRef<typeof Geogebra>>(null);
  const { materialId, ...state } = useAtomValue(nodeStateAtomFamily(id));

  return (
    <Widget className={className} asChild {...state}>
      <Geogebra className="-z-10" ref={ggbRef} id={id} materialId={materialId} />
    </Widget>
  );
};
