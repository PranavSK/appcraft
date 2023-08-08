import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

import { appletLayoutAtom } from '#/features/applet';
import { nodeStateAtomFamily as groupNodeStateAtomFamily } from '#/features/nodes/group-node';

import { SelectorState } from './data';

export const nodeStateAtomFamily = atomFamily((id: string) => {
  return atom(
    (get) => {
      const children = get(appletLayoutAtom)[id].children;
      const childStates = children.map((childId) => get(groupNodeStateAtomFamily(childId)).active);
      return { activeIndex: childStates.findIndex((active) => active) };
    },
    (get, set, update: SelectorState) => {
      const children = get(appletLayoutAtom)[id].children;
      const childStateAtoms = children.map((childId) => groupNodeStateAtomFamily(childId));
      childStateAtoms.forEach((childStateAtom, index) => {
        set(childStateAtom, { ...get(childStateAtom), active: index === update.activeIndex });
      });
    },
  );
});
