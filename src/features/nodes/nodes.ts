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

const editors = pipe(
  import.meta.glob<Node['PropertyEditor']>('./**-node/index.ts', {
    import: 'PropertyEditor',
  }),

  mapKeys((key) => key.replace('./', '').replace('-node/index.ts', '')),
  mapValues((mod) => lazy(async () => ({ default: await mod() }))),
);

// Wrap within lazy to ensure it is cached.
export const getNodePropertyEditor = (type: string) => {
  const editor = editors[type];
  if (!editor) {
    throw new Error(`Node type "${type}" does not exist`);
  }
  return editor;
};

const childrenTypes = import.meta.glob<Node['childrenTypes']>('./**-node/index.ts', {
  import: 'childrenTypes',
  eager: true,
});

export const getNodeChildrenTypes = (type: string) => {
  if (type === 'header') return ['text', 'latex', 'image'];
  if (type === 'footer') return [];
  if (type === 'grid') return ['paragraph', 'slider', 'geogebra'];
  const types = childrenTypes[`./${type}-node/index.ts`];
  if (!types) {
    throw new Error(`Node type "${type}" does not exist`);
  }
  return types;
};

const storeGetters = import.meta.glob<Node['getStore']>('./**-node/index.ts', {
  import: 'getStore',
  eager: true,
});

export const getStore = (type: string, id: string) => {
  const getter = storeGetters[`./${type}-node/index.ts`];
  if (!getter) {
    throw new Error(`Node type "${type}" does not exist`);
  }
  return getter(id);
};

export const deleteStore = (type: string, id: string) => {
  const getter = storeGetters[`./${type}-node/index.ts`];
  if (!getter) {
    throw new Error(`Node type "${type}" does not exist`);
  }
  getter.remove(id);
};
