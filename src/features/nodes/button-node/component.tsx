import { useAtomValue } from 'jotai';
import { type FC } from 'react';

import { useAppletStoreBoundFunction } from '#/features/applet/applet.store';
import { icons } from '#/features/cta-icons';
import { cn } from '#/lib/utils';

import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

export const Component: FC<NodeProps> = ({ id, className }) => {
  const { icon, label, disabled, onClick } = useAtomValue(nodeStateAtomFamily(id));
  const onClickImpl = useAppletStoreBoundFunction('click', onClick ?? '');
  const Icon = icons[icon];
  return (
    <button
      className={cn(
        'group mx-2 cursor-pointer rounded-md border border-[#1a1a1a] bg-background p-1',
        'text-left align-baseline ring-offset-background focus:outline-none focus:ring-2',
        'focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      disabled={disabled}
      onClick={onClickImpl}
    >
      <div
        className={cn(
          'inline-flex min-w-[2rem] items-center justify-center gap-3 rounded-md rounded-r-none px-3',
          'group-enabled:active:bg-[#C7C7C7]',
        )}
      >
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        {label}
      </div>
    </button>
  );
};
