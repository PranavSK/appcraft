import { Item, ItemIndicator, ItemText } from '@radix-ui/react-select';
import { useAtomValue } from 'jotai';
import { Check } from 'lucide-react';
import { type FC } from 'react';

import { ChildrenNode } from '#/features/nodes/common/components';
import { Text } from '#/features/ui/text';
import { cn } from '#/lib/utils';

import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

export const Component: FC<NodeProps> = ({ id, className }) => {
  const { value, text } = useAtomValue(nodeStateAtomFamily(id));
  return (
    <Item
      className={cn(
        'relative w-full cursor-default select-none rounded-md py-0.5 pl-5 pr-8 outline-none',
        'focus:bg-[#C7C7C7] data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      value={value}
    >
      <ItemText>
        {text && <Text className="text-xl" text={text} />}
        <ChildrenNode id={id} />
      </ItemText>
      <ItemIndicator asChild className="absolute right-3 top-1/2 -translate-y-1/2 p-1">
        <Check className="h-6 w-6" />
      </ItemIndicator>
    </Item>
  );
};
