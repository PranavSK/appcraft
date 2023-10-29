import type { Node } from './node.types';

const childrenTypes = import.meta.glob<Node['childrenTypes']>('./**-node/index.ts', {
  import: 'childrenTypes',
  eager: true,
});

export const getNodeChildrenTypes = (type: string) => {
  if (type === 'header') return ['text', 'latex', 'image'];
  if (type === 'grid')
    return [
      'paragraph',
      'geogebra',
      'rect',
      'slider',
      'animated-slider',
      'stepper',
      'radio-group',
      'checkbox-group',
      'button-group',
    ];
  if (type === 'footer') return ['cta'];
  if (type === 'behaviors') return ['group', 'selector'];
  const types = childrenTypes[`./${type}-node/index.ts`];
  if (!types) {
    throw new Error(`Node type "${type}" does not exist`);
  }
  return types;
};
