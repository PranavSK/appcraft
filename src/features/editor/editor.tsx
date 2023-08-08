import { getDefaultStore, Provider, useAtomValue } from 'jotai';
import { type FC } from 'react';

import { getResponsiveStore } from '#/features/applet/applet.store';
import { Split, SplitSeparator } from '#/features/ui/split';

import { breakpointAtom } from './editor.store';
import { EditorProps } from './editor.types';
import { Menubar } from './menubar';
import { NodeLayoutEditor } from './node-layout-editor';
import { Preview } from './preview';
import { PropertyEditor } from './property-editor';

export const Editor: FC<EditorProps> = ({ initialState }) => {
  const breakpoint = useAtomValue(breakpointAtom, { store: getDefaultStore() });
  const store = getResponsiveStore(breakpoint);
  return (
    <Provider store={store}>
      <Split minPrimarySize="10rem" defaultSplit={20}>
        <NodeLayoutEditor />
        <SplitSeparator />

        <Split minPrimarySize="30rem" defaultSplit={60}>
          <div className="flex h-screen flex-col">
            <Menubar />
            <Preview initialState={initialState} />
          </div>
          <SplitSeparator />
          <PropertyEditor />
        </Split>
      </Split>
    </Provider>
  );
};
