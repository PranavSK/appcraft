import { Indicator, Item } from '@radix-ui/react-radio-group';
import { cva } from 'class-variance-authority';
import { useAtomValue } from 'jotai';
import { type FC } from 'react';

import { Text } from '#/features/ui/text';

import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

const containerVariants = cva(
  [
    'group mx-2 rounded-md border border-[#1a1a1a] bg-background p-1',
    'text-left align-baseline ring-offset-background focus:outline-none focus:ring-2',
    'focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: '',
        success: 'data-[state=checked]:border-[#6CA621] data-[state=checked]:text-[#6CA621]',
        error: 'data-[state=checked]:border-[#CC6666] data-[state=checked]:text-[#CC6666]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const innerContainerVariants = cva(
  ['inline-flex min-w-[2rem] items-center justify-center gap-3 rounded-md rounded-r-none px-3'],
  {
    variants: {
      variant: {
        default: 'group-data-[state=checked]:bg-[#C7C7C7]',
        success: 'group-data-[state=checked]:bg-[#F0FFF4]',
        error: 'group-data-[state=checked]:bg-[#FFF2F2]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const Component: FC<NodeProps> = ({ id, className }) => {
  const { value, variant, text } = useAtomValue(nodeStateAtomFamily(id));
  return (
    <Item value={value} className={containerVariants({ className, variant })}>
      <div className={innerContainerVariants({ variant })}>
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <Indicator asChild>
            <circle cx="12" cy="12" r="6" fill="currentColor" />
          </Indicator>
        </svg>
        {text && <Text className="text-xl" text={text} />}
      </div>
    </Item>
  );
};
