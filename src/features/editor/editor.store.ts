import { atom } from 'jotai';
import { noop } from 'remeda';

import { type AppletState } from '#/features/applet';
import { Breakpoint } from '#/lib/breakpoint';

export const selectedNodeAtom = atom<{
  id: string | null;
  type: string | null;
  parent: string | null;
}>({
  id: null,
  type: null,
  parent: null,
});
export const breakpointAtom = atom<Breakpoint>('DEFAULT');
const saveAtom = atom<{ onSave: (state: AppletState, id: string) => void }>({ onSave: noop });
export const onSaveAtom = atom(
  (get) => get(saveAtom).onSave,
  (_, set, onSave: (state: AppletState, id: string) => void) => set(saveAtom, { onSave }),
);
