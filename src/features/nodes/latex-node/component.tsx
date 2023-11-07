import { useAtomValue } from 'jotai';
import { FC } from 'react';

import { InlineLatex } from '#/features/ui/latex';
import { cn } from '#/lib/utils';

import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

export const Component: FC<NodeProps> = ({ id, className }) => {
  const state = useAtomValue(nodeStateAtomFamily(id));
  return <InlineLatex className={cn(className, 'text-xl')} {...state} />;
};
