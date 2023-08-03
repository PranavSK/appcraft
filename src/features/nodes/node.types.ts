import { type PrimitiveAtom } from 'jotai/vanilla';
import { type AtomFamily } from 'jotai/vanilla/utils/atomFamily';
import { ComponentType } from 'react';

export interface NodeProps {
  id: string;
  className?: string;
}

export interface NodePropertyEditorProps {
  id: string;
}

export interface Node {
  Component: ComponentType<NodeProps>;
  PropertyEditor: ComponentType<NodePropertyEditorProps>;
  childrenTypes: readonly string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getStore: AtomFamily<string, PrimitiveAtom<any>>;
}
