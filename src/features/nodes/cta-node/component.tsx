import { useAtomValue } from 'jotai';
import { RotateCcw, Shuffle, Wand2 } from 'lucide-react';
import { type FC } from 'react';

import { useAppletStoreBoundFunction } from '#/features/applet';
import { Button } from '#/features/ui/button';
import { cn } from '#/lib/utils';

import type { NodeProps } from '../node.types';
import { CtaState } from './data';
import { nodeStateAtomFamily } from './store';

const iconClassNames = 'w-4 h-4 mr-2';

const Icon = ({ icon }: { icon: CtaState['icon'] }) => {
  switch (icon) {
    case 'start':
      return <Wand2 className={cn(iconClassNames, 'motion-safe:group-hover:animate-bounce')} />;
    case 'retry':
      return (
        <RotateCcw className={cn(iconClassNames, 'motion-safe:group-hover:animate-spin-reverse')} />
      );
    case 'try-new':
      return <Shuffle className={cn(iconClassNames, 'motion-safe:group-hover:animate-bounce')} />;
    default:
      return null;
  }
};

export const Component: FC<NodeProps> = ({ id, className }) => {
  const { icon, label, onClick } = useAtomValue(nodeStateAtomFamily(id));
  const onClickImpl = useAppletStoreBoundFunction(onClick ?? '');
  return (
    <Button className={cn(className, 'group text-lg')} onClick={onClickImpl}>
      <Icon icon={icon} />
      {label}
    </Button>
  );
};