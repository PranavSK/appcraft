import { atom, ExtractAtomValue, SetStateAction } from 'jotai';
import { atomFamily } from 'jotai/utils';

import { atomWithHistory } from '#/lib/jotai';

import { defaultState } from './data';

const _family = atomFamily((_id: string) => atomWithHistory(defaultState));

// This is to ensure that any set donne is saved as a text.
export const nodeStateAtomFamily = atomFamily((_id: string) => {
  return atom(
    (get) => get(_family(_id)),
    (get, set, update: SetStateAction<ExtractAtomValue<ReturnType<typeof _family>>>) => {
      const { text, ...rest } = typeof update === 'function' ? update(get(_family(_id))) : update;
      set(_family(_id), { text: `${text}`, ...rest });
    },
  );
});
