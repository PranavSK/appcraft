import { useAtomValue } from 'jotai';
import { type FC } from 'react';

import { BlockLatex } from '#/features/ui/latex';
import { Widget } from '#/features/ui/widget';

import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

export const Component: FC<NodeProps> = ({ id, className }) => {
  const { latex, ...state } = useAtomValue(nodeStateAtomFamily(id));
  return (
    <Widget asChild className={className} {...state}>
      <BlockLatex latex={latex} className={'text-xl'} />
    </Widget>
  );
};
