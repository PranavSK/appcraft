import { lazy } from 'react';
import { mapKeys, mapValues, pipe } from 'remeda';

import type { Node } from './node.types';

const components = pipe(
  import.meta.glob<Node['Component']>('./**-node/index.ts', {
    import: 'Component',
  }),
  mapKeys((key) => key.replace('./', '').replace('-node/index.ts', '')),
  mapValues((mod) => lazy(async () => ({ default: await mod() }))),
);
// Wrap within lazy to ensure it is cached.

export const getNodeComponent = (type: string) => {
  const component = components[type];
  if (!component) {
    throw new Error(`Node type "${type}" does not exist`);
  }
  return component;
};
