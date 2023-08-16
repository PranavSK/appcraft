import {
  Content,
  Icon,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select';
import { cva } from 'class-variance-authority';
import { useAtomValue } from 'jotai';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { type FC } from 'react';

import { appletFontSizeAtom, useAppletStoreBoundFunction } from '#/features/applet/applet.store';
import { ChildrenNode } from '#/features/nodes/common/components';
import { cn } from '#/lib/utils';

import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

const triggerOuterContainerVariants = cva(
  [
    'mx-2 rounded-md border bg-background p-1',
    'text-left align-baseline ring-offset-background focus:outline-none focus:ring-2',
    'focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'border-[#1a1a1a]',
        success: 'border-[#6CA621]',
        error: 'border-[#CC6666]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const triggerInnerContainerVariants = cva(
  ['inline-flex min-w-[2rem] items-center justify-center gap-3 rounded-md rounded-r-none px-3'],
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        success: 'bg-[#F0FFF4] text-[#6CA621]',
        error: 'bg-[#FFF2F2] text-[#CC6666]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const triggerIconVariants = cva(['h-4 w-4 rounded-md rounded-l-none'], {
  variants: {
    variant: {
      default: 'text-primary',
      success: 'text-[#6CA621]',
      error: 'text-[#CC6666]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const Component: FC<NodeProps> = ({ id, className }) => {
  const { variant, defaultValue, onValueChange, onOpenChange } = useAtomValue(
    nodeStateAtomFamily(id),
  );

  const onValueChangeImpl = useAppletStoreBoundFunction('value', onValueChange ?? '');
  const onOpenChangeImpl = useAppletStoreBoundFunction('open', onOpenChange ?? '');

  const style = useAtomValue(appletFontSizeAtom);
  return (
    <Root
      defaultValue={defaultValue}
      onValueChange={onValueChangeImpl}
      onOpenChange={onOpenChangeImpl}
    >
      <Trigger className={triggerOuterContainerVariants({ className, variant })}>
        <div className={triggerInnerContainerVariants({ variant })}>
          <Value />
          <Icon asChild className={triggerIconVariants({ variant })}>
            <ChevronDown />
          </Icon>
        </div>
      </Trigger>
      <Portal>
        <Content
          className={cn(
            'relative z-50 overflow-hidden rounded-md border border-[#1a1a1a] bg-white p-1',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          )}
          align="center"
          style={style}
        >
          <ScrollUpButton className="absolute left-1/2 top-0 -translate-x-1/2">
            <ChevronUp />
          </ScrollUpButton>
          <Viewport className="flex flex-col items-center gap-3">
            <ChildrenNode id={id} />
          </Viewport>
          <ScrollDownButton className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <ChevronDown />
          </ScrollDownButton>
        </Content>
      </Portal>
    </Root>
  );
};
