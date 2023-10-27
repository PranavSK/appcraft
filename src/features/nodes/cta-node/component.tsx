import { useAtomValue } from 'jotai';
import { type FC } from 'react';

import { useAppletStoreBoundFunction } from '#/features/applet/applet.store';
import { icons } from '#/features/cta-icons';
import { Button } from '#/features/ui/button';
import { cn } from '#/lib/utils';

import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

export const Component: FC<NodeProps> = ({ id, className }) => {
  const { icon, label, disabled, onClick, variant } = useAtomValue(nodeStateAtomFamily(id));
  const onClickImpl = useAppletStoreBoundFunction(onClick ?? '');

  const Icon = icons[icon];

  return (
    <Button
      variant={variant}
      className={cn(className, 'group h-10 border-primary text-xl')}
      onClick={onClickImpl}
      disabled={disabled}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {label}
    </Button>
  );
};
