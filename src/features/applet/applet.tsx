import { getDefaultStore, Provider, useStore } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { type FC, Suspense, useEffect, useMemo } from 'react';
import { filter, fromPairs, keys, map, pick, pipe } from 'remeda';

import { getNodeStateAtom } from '#/features/nodes';
import { Card } from '#/features/ui/card';
import { useContainerResponsive } from '#/hooks/use-container-responsive';
import { mapToClosestBreakpoint } from '#/lib/breakpoint';
import { useClearHistory } from '#/lib/jotai';

import { appletLayoutAtom, getResponsiveStore } from './applet.store';
import type { AppletProps, AppletState } from './applet.types';
import { Footer } from './footer';
import { Grid } from './grid';
import { Header } from './header';

const defaultInitialState: AppletState = {
  DEFAULT: [
    {
      id: 'header',
      type: 'header',
      children: [],
      groups: [],
      initialState: undefined,
    },
    {
      id: 'grid',
      type: 'grid',
      children: [],
      groups: [],
      initialState: undefined,
    },
    {
      id: 'footer',
      type: 'footer',
      children: [],
      groups: [],
      initialState: undefined,
    },
    {
      id: 'behaviors',
      type: 'behaviors',
      children: [],
      groups: [],
      initialState: undefined,
    },
  ],
};

type NodeStates = AppletState['DEFAULT'];

function getHydratedAtoms(initialState: NodeStates) {
  const hydrations = pipe(
    initialState,
    filter(
      (node) =>
        node.type !== 'header' &&
        node.type !== 'footer' &&
        node.type !== 'grid' &&
        node.type !== 'behaviors',
    ),
    map((node) => {
      const { type, id, initialState } = node;
      const atom = getNodeStateAtom(type, id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return [atom, initialState] as [any, any];
    }),
  );

  const layout = fromPairs(
    pipe(
      initialState,
      map((node) => [node.id, pick(node, ['type', 'children'])] as const),
    ),
  );

  hydrations.push([appletLayoutAtom, layout]);
  return new Map(hydrations);
}

const wakStoreSet = new WeakSet();

const HydrateAppletAtoms: FC<{ nodesData: NodeStates }> = ({ nodesData }) => {
  const hydrations = useMemo(() => getHydratedAtoms(nodesData), [nodesData]);
  useHydrateAtoms(hydrations);
  // Need to clear history since hydration is considered as changes.
  const clearHistory = useClearHistory();
  const store = useStore();
  useEffect(() => {
    if (store === getDefaultStore()) return;
    if (wakStoreSet.has(store)) return;
    wakStoreSet.add(store);
    clearHistory();
  }, [clearHistory, store]);

  return null;
};

export const Applet: FC<AppletProps> = ({
  initialState = defaultInitialState,
  overrideBreakpoint,
}) => {
  const { ref, breakpoint, containerWidth } = useContainerResponsive();

  const actualBreakpoint = useMemo(() => {
    if (overrideBreakpoint) return overrideBreakpoint;
    return mapToClosestBreakpoint(breakpoint, keys.strict(initialState));
  }, [breakpoint, initialState, overrideBreakpoint]);

  const nodesData = useMemo(() => {
    return initialState[actualBreakpoint] ?? defaultInitialState.DEFAULT;
  }, [initialState, actualBreakpoint]);

  const store = getResponsiveStore(actualBreakpoint);

  const style = useMemo(
    () => ({
      fontSize: `clamp(0.625rem,calc(0.625rem + (1.25 - 0.625) * ((${containerWidth}px - 20rem) / (96 - 20))),1.25rem)`,
    }),
    [containerWidth],
  );

  useEffect(() => {
    const availableBreakpoints = keys.strict(initialState);
    for (const bp of availableBreakpoints) {
      // create stores for all breakpoints
      getResponsiveStore(bp);
    }
  }, [initialState]);

  return (
    <Card data-testid="applet" className="box-border flex h-full flex-col" style={style} ref={ref}>
      <Provider store={store}>
        <Suspense>
          <HydrateAppletAtoms nodesData={nodesData} />
          <Header />
          <Grid />
          <Footer />
          {/* <Behaviors /> */}
        </Suspense>
      </Provider>
    </Card>
  );
};
