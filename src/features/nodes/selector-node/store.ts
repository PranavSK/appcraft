import { atom, SetStateAction } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { isFunction } from 'remeda';

import { appletLayoutAtom } from '#/features/applet/applet.store';
import { nodeStateAtomFamily as groupNodeStateAtomFamily } from '#/features/nodes/group-node';
import { atomWithHistory } from '#/lib/jotai';

import { SelectorState } from './data';

const selectorAtomFamily = atomFamily((_id: string) =>
  atomWithHistory<SelectorState>({ activeIndex: 0 }),
);

export const nodeStateAtomFamily = atomFamily((id: string) => {
  return atom(
    (get) => get(selectorAtomFamily(id)),
    (get, set, update: SetStateAction<SelectorState>) => {
      const { activeIndex } = isFunction(update) ? update(get(selectorAtomFamily(id))) : update;
      set(selectorAtomFamily(id), { activeIndex });
      const children = get(appletLayoutAtom)[id]?.children ?? [];
      const childStateAtoms = children.map((childId) => groupNodeStateAtomFamily(childId));
      childStateAtoms.forEach((childStateAtom, index) => {
        set(childStateAtom, { ...get(childStateAtom), active: index === activeIndex });
      });
    },
  );
});
