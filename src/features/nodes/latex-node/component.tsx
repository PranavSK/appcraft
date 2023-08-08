import { useAtomValue } from 'jotai';
import { FC } from 'react';

import { Latex } from '#/features/ui/latex';
import { cn } from '#/lib/utils';

import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

export const Component: FC<NodeProps> = ({ id, className }) => {
  const state = useAtomValue(nodeStateAtomFamily(id));
  return <Latex className={cn(className, 'text-xl')} {...state} />;
};
