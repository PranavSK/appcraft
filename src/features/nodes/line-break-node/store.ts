import { atomFamily } from 'jotai/utils';

import { atomWithHistory } from '#/lib/jotai';

export const nodeStateAtomFamily = atomFamily((_id: string) => atomWithHistory(null));
