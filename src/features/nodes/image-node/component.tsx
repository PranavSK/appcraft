import { useAtomValue } from 'jotai';
import { FC } from 'react';

import { Image } from '#/features/ui/image';
import { cn } from '#/lib/utils';

import type { NodeProps } from '../node.types';
import { getStore } from './store';

export const Component: FC<NodeProps> = ({ id, className }) => {
  const state = useAtomValue(getStore(id));
  return <Image className={cn(className, 'text-xl')} {...state} />;
};
