import { useAtomValue } from 'jotai';
import { ComponentRef, FC, useRef } from 'react';

import { Geogebra } from '#/features/integrations/geogebra';
import { Widget } from '#/features/ui/widget';

import type { NodeProps } from '../node.types';
import { getStore } from './store';

export const Component: FC<NodeProps> = ({ id, className }) => {
  const ggbRef = useRef<ComponentRef<typeof Geogebra>>(null);
  const { materialId, ...state } = useAtomValue(getStore(id));

  return (
    <Widget className={className} asChild {...state}>
      <Geogebra ref={ggbRef} id={id} materialId={materialId} />
    </Widget>
  );
};
