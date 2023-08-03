import { atomFamily } from 'jotai/utils';

import { atomWithHistory } from '#/lib/jotai';

import { defaultState } from './data';

export const getStore = atomFamily((_id: string) => atomWithHistory(defaultState));
