import { Indicator, Root } from '@radix-ui/react-checkbox';
import { cva } from 'class-variance-authority';
import { useAtom } from 'jotai';
import { type FC, useCallback } from 'react';

import { useAppletStoreBoundFunction } from '#/features/applet/applet.store';
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
        disabled: '',
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
        disabled: 'group-data-[state=checked]:bg-[#C7C7C7]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const Component: FC<NodeProps> = ({ id, className }) => {
  const [{ variant, checked, text, showIcon, onCheckedChange }, setState] = useAtom(
    nodeStateAtomFamily(id),
  );

  const onCheckedChangeImpl = useAppletStoreBoundFunction('checked', onCheckedChange ?? '');
  const handleCheckedChange = useCallback(
    (checked: boolean) => {
      setState((state) => ({ ...state, checked }));
      onCheckedChangeImpl(checked);
    },
    [onCheckedChangeImpl, setState],
  );

  return (
    <Root
      checked={checked}
      onCheckedChange={handleCheckedChange}
      className={containerVariants({ className, variant })}
      disabled={variant === 'disabled'}
    >
      <div className={innerContainerVariants({ variant })}>
        {showIcon && (
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
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <Indicator asChild>
              <rect width="10" height="10" x="7" y="7" rx="2" fill="currentColor" />
            </Indicator>
          </svg>
        )}
        {text && <Text className="text-xl" text={text} />}
      </div>
    </Root>
  );
};
