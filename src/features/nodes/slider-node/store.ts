import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { omit } from 'remeda';

import { atomWithHistory } from '#/lib/jotai';

import { defaultState, type SliderState } from './data';

// Split the state into 2 atoms to reduce rerendering on slider change.
export const valueFamily = atomFamily((_id: string) => atomWithHistory(defaultState.value));
export const sliderFamily = atomFamily((_id: string) =>
  atomWithHistory(omit(defaultState, ['value'])),
);
export const getStore = atomFamily((id: string) =>
  atom(
    (get) => {
      return { ...get(sliderFamily(id)), value: get(valueFamily(id)) };
    },
    (get, set, update: SliderState) => {
      const { value, ...rest } = update;
      const currentValue = get(valueFamily(id));
      if (value !== currentValue) set(valueFamily(id), update.value);
      set(sliderFamily(id), rest);
    },
  ),
);
