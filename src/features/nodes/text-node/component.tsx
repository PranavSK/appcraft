import { useAtomValue } from 'jotai';
import { FC } from 'react';

import { Text } from '#/features/ui/text';
import { cn } from '#/lib/utils';

import type { NodeProps } from '../node.types';
import { getStore } from './store';

export const Component: FC<NodeProps> = ({ id, className }) => {
  const state = useAtomValue(getStore(id));
  return <Text className={cn(className, 'text-xl')} {...state} />;
};
