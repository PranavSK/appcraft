import { lazy } from 'react';
import { mapKeys, mapValues, pipe } from 'remeda';

import type { Node } from './node.types';

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
