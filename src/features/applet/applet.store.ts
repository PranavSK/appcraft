import { atom, createStore, getDefaultStore, useAtomValue, useStore } from 'jotai';
import { atomWithReset, RESET, selectAtom } from 'jotai/utils';
import { useCallback } from 'react';
import { filter, fromPairs, keys, omit, setPath, values } from 'remeda';

import { getValidGeogebraApi } from '#/features/integrations/geogebra';
import { useMemoizedCallback } from '#/hooks/use-memoized-callback';
import { Breakpoint, WithResponsive } from '#/lib/breakpoint';
import { atomWithHistory } from '#/lib/jotai';

import { deleteStore, getNodeStateAtom } from '../nodes/atoms';
import { AppletState } from './applet.types';

export const appletLayoutAtom = atomWithHistory<
  Record<string, Pick<AppletState['DEFAULT'][number], 'type' | 'children' | 'groups'>>
>(
  fromPairs([
    ['header', { type: 'header', children: [], groups: [] }],
    ['grid', { type: 'grid', children: [], groups: [] }],
    ['footer', { type: 'footer', children: [], groups: [] }],
    ['behaviors', { type: 'behaviors', children: [], groups: [] }],
  ]),
);

export function useHasChildren(id: string, type?: string) {
  return useAtomValue(
    selectAtom(
      appletLayoutAtom,
      useCallback(
        (layout) => {
          if (type)
            return layout[id].children.filter((child) => layout[child].type === type).length > 0;
          return layout[id].children.length > 0;
        },
        [id, type],
      ),
    ),
  );
}

export function useFilteredChildren(id: string, filterType?: string | number | number[]) {
  const selectedAtom = selectAtom(
    appletLayoutAtom,
    useCallback(
      (state) => {
        const children = state[id].children;
        if (typeof filterType === 'string')
          return filter(children, (child) => state[child].type === filterType);
        if (typeof filterType === 'number')
          return filterType < children.length ? [children[filterType]] : [];
        if (Array.isArray(filterType))
          return filter(
            filterType.map((index) => children[index]),
            Boolean,
          );
        return children;
      },
      [id, filterType],
    ),
  );

  return useAtomValue(selectedAtom);
}

export function useParent(id: string) {
  const selectedAtom = selectAtom(
    appletLayoutAtom,
    useCallback(
      (state) => {
        const parent = keys(state).find((key) => state[key].children.includes(id));
        if (parent == null) throw new Error(`Node ${id} has no parent`);
        return parent;
      },
      [id],
    ),
  );

  return useAtomValue(selectedAtom);
}

export function useSiblingIndex(id: string) {
  const parent = useParent(id);
  const selectedAtom = selectAtom(
    appletLayoutAtom,
    useCallback(
      (state) => {
        const parentChildren = state[parent].children;
        return parentChildren.findIndex((child) => child === id);
      },
      [id, parent],
    ),
  );

  return useAtomValue(selectedAtom);
}

const storeMap = atomWithReset<WithResponsive<ReturnType<typeof createStore>>>({
  DEFAULT: createStore(),
});

export const getResponsiveStore = (breakpoint: Breakpoint) => {
  const defaultStore = getDefaultStore();
  let store = defaultStore.get(storeMap)[breakpoint];
  if (store != null) return store; // Already created
  store = createStore();
  defaultStore.set(storeMap, setPath([breakpoint], store));
  return store;
};

export const deleteResponsiveStore = (breakpoint: Breakpoint) => {
  if (breakpoint === 'DEFAULT') return;
  const defaultStore = getDefaultStore();
  const store = defaultStore.get(storeMap)[breakpoint];
  if (store == null) return; // Already deleted
  defaultStore.set(storeMap, omit([breakpoint]));
};

export const availableBreakpointsAtom = atom<Breakpoint[]>((get) => keys.strict(get(storeMap)));

export function useAppletStoreBoundFunction(...args: string[]) {
  const store = useStore();
  function get(type: string, id: string, key: string) {
    const nodeStore = getNodeStateAtom(type, id);
    if (type === 'geogebra') {
      const api = getValidGeogebraApi(id, store);
      if (api == null) return;
      return api.getValue(key);
    }
    return store.get(nodeStore)[key];
  }
  function set(type: string, id: string, key: string, value: unknown) {
    const nodeStore = getNodeStateAtom(type, id);
    if (type === 'geogebra') {
      const api = getValidGeogebraApi(id, store);
      if (api == null) return;
      api.setValue(key, Number(value));
    } else store.set(nodeStore, setPath([key], value));
  }

  const boundFunction = new Function('get', 'set', ...args).bind(null, get, set);

  return useMemoizedCallback((...args: unknown[]) => {
    // TODO: Error handling
    boundFunction(...args);
  });
}

export const appletIdAtom = atom<string | null>(null);

export function storeToObject() {
  const defaultStore = getDefaultStore();
  const stores = defaultStore.get(storeMap);
  const state = new Map();
  for (const [breakpoint, store] of Object.entries(stores)) {
    const nodes: AppletState['DEFAULT'] = [];
    const layout = store.get(appletLayoutAtom);
    for (const [id, { type, children, groups }] of Object.entries(layout)) {
      let initialState;
      if (type === 'header' || type === 'footer' || type === 'grid' || type === 'behaviors') {
        initialState = undefined;
      } else {
        const nodeStore = getNodeStateAtom(type, id);
        initialState = store.get(nodeStore);
      }
      nodes.push({ id, type, children, groups, initialState });
    }
    state.set(breakpoint, nodes);
  }

  return Object.fromEntries(state);
}

function cleanup() {
  const stores = values(getDefaultStore().get(storeMap));
  for (const store of stores) {
    if (store == null) continue;
    const layout = store.get(appletLayoutAtom);
    for (const [id, { type }] of Object.entries(layout)) {
      if (type === 'header' || type === 'footer' || type === 'grid' || type === 'behaviors')
        continue;
      deleteStore(type, id);
    }
  }

  getDefaultStore().set(storeMap, RESET);
}

getDefaultStore().sub(appletIdAtom, cleanup);

export const appletFontSizeAtom = atom<{ fontSize: string }>({ fontSize: '16px' });
