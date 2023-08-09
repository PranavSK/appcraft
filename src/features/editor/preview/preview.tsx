import { getDefaultStore, useAtomValue } from 'jotai';
import { type FC } from 'react';

import { Applet, type AppletProps } from '#/features/applet';
import { ScrollArea, ScrollBar } from '#/features/ui/scroll-area';

import { breakpointAtom } from '../editor.store';

const containerStyles = {
  DEFAULT: {
    height: '640px',
    width: '360px',
  },
  sm: {
    height: '800px',
    width: '700px',
  },
  md: {
    height: '1180px',
    width: '820px',
  },
  lg: {
    height: '1100px',
    width: '1100px',
  },
  xl: {
    height: '700px',
    width: '1300px',
  },
  '2xl': {
    height: '1080px',
    width: '1920px',
  },
};

export const Preview: FC<AppletProps> = (props) => {
  const breakpoint = useAtomValue(breakpointAtom, { store: getDefaultStore() });

  return (
    <ScrollArea className="h-screen">
      <div className="mx-auto box-border p-1" style={containerStyles[breakpoint]}>
        <Applet {...{ ...props, overrideBreakpoint: breakpoint }} />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
