import { atom, useAtomValue, type useStore } from 'jotai';
import { atomFamily } from 'jotai/utils';

import type { GeogebraAppApi } from './geogebra.app.types';

export const geogebraApiAtomFamily = atomFamily((_id: string) => atom<GeogebraAppApi | null>(null));

export function getValidGeogebraApi(id: string, store: ReturnType<typeof useStore>) {
  const geogebraApiAtom = geogebraApiAtomFamily(id);
  const api = store.get(geogebraApiAtom);
  if (api != null) return api;

  geogebraApiAtomFamily.remove(id);
}

export function useGeogebraApi(id: string) {
  return useAtomValue(geogebraApiAtomFamily(id));
}
