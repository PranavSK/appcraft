import { useAtomValue } from 'jotai';
import { RotateCcw, Shuffle, Wand2 } from 'lucide-react';
import { type FC } from 'react';

import { useAppletStoreBoundFunction } from '#/features/applet/applet.store';
import { Button } from '#/features/ui/button';
import { cn } from '#/lib/utils';

import type { NodeProps } from '../node.types';
import { CtaState } from './data';
import { nodeStateAtomFamily } from './store';

const iconClassNames = 'w-4 h-4 mr-2';

const Icon = ({ icon }: { icon: CtaState['icon'] }) => {
  switch (icon) {
    case 'start':
      return <Wand2 className={iconClassNames} />;
    case 'retry':
      return <RotateCcw className={iconClassNames} />;
    case 'try-new':
      return <Shuffle className={iconClassNames} />;
    default:
      return null;
  }
};

export const Component: FC<NodeProps> = ({ id, className }) => {
  const { icon, label, onClick, variant } = useAtomValue(nodeStateAtomFamily(id));
  const onClickImpl = useAppletStoreBoundFunction(onClick ?? '');
  return (
    <Button
      variant={variant}
      className={cn(className, 'group h-10 border-primary text-xl')}
      onClick={onClickImpl}
    >
      <Icon icon={icon} />
      {label}
    </Button>
  );
};
