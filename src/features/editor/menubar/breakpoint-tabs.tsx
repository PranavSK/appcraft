import { atom, getDefaultStore, useAtom, useAtomValue } from 'jotai';
import { Plus, Trash2 } from 'lucide-react';
import { type FC } from 'react';
import { difference, keys } from 'remeda';

import {
  availableBreakpointsAtom,
  deleteResponsiveStore,
  getResponsiveStore,
} from '#/features/applet/applet.store';
import { Button } from '#/features/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/features/ui/dropdown-menu';
import { Label } from '#/features/ui/label';
import { breakpoints } from '#/lib/breakpoint';

import { breakpointAtom } from '../editor.store';

const unusedBreakpointsAtom = atom((get) =>
  difference(keys.strict(breakpoints), get(availableBreakpointsAtom)),
);

export const BreakpointTabs: FC = () => {
  const availableBreakpoints = useAtomValue(availableBreakpointsAtom, { store: getDefaultStore() });
  const unusedBreakpoints = useAtomValue(unusedBreakpointsAtom, { store: getDefaultStore() });
  const [activeBreakpoint, setActiveBreakpoint] = useAtom(breakpointAtom, {
    store: getDefaultStore(),
  });

  return (
    <div className="flex grow items-center gap-2">
      <Label>Breakpoints</Label>
      {availableBreakpoints.map((bp) => (
        <Button
          key={bp}
          variant={bp === activeBreakpoint ? 'default' : 'ghost'}
          disabled={bp === activeBreakpoint}
          onClick={() => setActiveBreakpoint(bp)}
        >
          {bp}
        </Button>
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" onClick={() => null}>
            <Plus className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20">
          {unusedBreakpoints.map((bp) => (
            <DropdownMenuItem
              key={bp}
              onClick={() => {
                getResponsiveStore(bp);
                setActiveBreakpoint(bp);
              }}
            >
              {bp}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant="ghost"
        size="icon"
        disabled={activeBreakpoint === 'DEFAULT'}
        onClick={() => {
          setActiveBreakpoint('DEFAULT');
          deleteResponsiveStore(activeBreakpoint);
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
