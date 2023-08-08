import type { Node } from './node.types';

const nodeStateAtomFamilyFromType = import.meta.glob<Node['nodeStateAtomFamily']>(
  './**-node/index.ts',
  {
    import: 'nodeStateAtomFamily',
    eager: true,
  },
);

export const getNodeStateAtom = (type: string, id: string) => {
  const getter = nodeStateAtomFamilyFromType[`./${type}-node/index.ts`];
  if (!getter) {
    throw new Error(`Node type "${type}" does not exist`);
  }
  return getter(id);
};

export const deleteStore = (type: string, id: string) => {
  const getter = nodeStateAtomFamilyFromType[`./${type}-node/index.ts`];
  if (!getter) {
    throw new Error(`Node type "${type}" does not exist`);
  }
  getter.remove(id);
};
