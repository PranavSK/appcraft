import { useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FC, useCallback } from 'react';

import { ChildrenNode } from '#/features/nodes/common';
import { Button } from '#/features/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '#/features/ui/collapsible';
import { useBoolean } from '#/hooks/use-boolean';
import { useContainerResponsive } from '#/hooks/use-container-responsive';
import { compareBreakpoints } from '#/lib/breakpoint';
import { cn } from '#/lib/utils';

import { appletLayoutAtom } from '../applet.store';

export const Header: FC = () => {
  const [open, { toggle }] = useBoolean(true);
  const { ref, breakpoint } = useContainerResponsive();
  const hasChildren = useAtomValue(
    selectAtom(
      appletLayoutAtom,
      useCallback((layout) => layout.header.children.length > 0, []),
    ),
  );
  if (!hasChildren) return null;
  return (
    <Collapsible
      className={cn(
        'relative mx-auto mb-3 flex min-h-[1.5rem] w-full flex-col items-center justify-center space-y-1.5',
        'bg-secondary px-6 pb-5 pt-3 text-secondary-foreground',
        'before:absolute before:left-0 before:top-full before:block before:h-3 before:w-3',
        'before:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))]',
        'before:from-transparent before:from-70% before:to-secondary before:to-70%',
        'after:absolute after:right-0 after:top-full after:block after:h-3 after:w-3',
        'after:bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))]',
        'after:from-transparent after:from-70% after:to-secondary after:to-70%',
        compareBreakpoints(breakpoint, 'md') >= 0 && [
          'w-9/12 rounded-b-xl before:-left-3 before:top-0',
          'before:bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))]',
          'after:-right-3 after:top-0',
          'after:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))]',
        ],
      )}
      open={open}
      onClick={toggle}
      ref={ref}
    >
      <CollapsibleContent
        className={cn(
          'z-10 shrink-0 overflow-hidden text-center font-bold',
          open ? 'animate-collapsible-down' : 'animate-collapsible-up',
        )}
      >
        <ChildrenNode id={'header'} />
      </CollapsibleContent>
      <CollapsibleTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="absolute -bottom-2 h-10 w-10 rounded-full p-2 pb-0"
        >
          {open ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </CollapsibleTrigger>
    </Collapsible>
  );
};
