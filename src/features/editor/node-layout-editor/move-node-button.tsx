import { ExtractAtomValue, useAtomValue, useSetAtom } from 'jotai';
import { MoveDown, MoveUp } from 'lucide-react';
import { FC } from 'react';
import { setPath } from 'remeda';

import { appletLayoutAtom } from '#/features/applet';
import { Button } from '#/features/ui/button';
import { useMemoizedCallback } from '#/hooks/use-memoized-callback';
import { swapIndices } from '#/lib/array';

import { selectedNodeAtom } from '../editor.store';

function useEditorAppletSwapChildren(node: ExtractAtomValue<typeof selectedNodeAtom>) {
  const { id, parent } = node;
  const setLayout = useSetAtom(appletLayoutAtom);

  return useMemoizedCallback((direction: 'up' | 'down') => {
    setLayout((layout) => {
      if (id == null || parent == null) return layout;
      const nodeData = layout[parent];
      if (nodeData == null) return layout;
      let children = [...nodeData.children];
      const index = children.indexOf(id);
      if (index === -1) return layout;
      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      if (swapIndex < 0 || swapIndex >= children.length) return layout;

      children = swapIndices(children, index, swapIndex);
      const layoutCopy = setPath(layout, [parent, 'children'], children);
      return layoutCopy;
    });
  });
}

export const MoveNodeButton: FC<{ direction: 'up' | 'down' }> = ({ direction }) => {
  const selectedNode = useAtomValue(selectedNodeAtom);

  const handleSwap = useEditorAppletSwapChildren(selectedNode);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => handleSwap(direction)}
      disabled={selectedNode.id == null || selectedNode.parent === 'root'}
    >
      {direction === 'up' ? <MoveUp className="h-4 w-4" /> : <MoveDown className="h-4 w-4" />}
    </Button>
  );
};
