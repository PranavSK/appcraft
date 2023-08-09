import { useAtomValue } from 'jotai';
import { FC, useEffect, useRef, useState } from 'react';

import { Text } from '#/features/ui/text';
import { cn, preventRunts } from '#/lib/utils';

import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

export const Component: FC<NodeProps> = ({ id, className }) => {
  const [isLast, setIsLast] = useState(false);
  const { text, ...state } = useAtomValue(nodeStateAtomFamily(id));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      setIsLast(ref.current.nextSibling === null);
    }
  }, []);

  return (
    <Text
      className={cn(className, 'text-xl')}
      text={isLast ? preventRunts(text) : text}
      {...state}
      ref={ref}
    />
  );
};
