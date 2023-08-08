import { useAtomValue, useSetAtom } from 'jotai';
import { Trash2 } from 'lucide-react';
import { FC } from 'react';
import { clone, setPath } from 'remeda';

import { appletLayoutAtom } from '#/features/applet/applet.store';
import { deleteStore } from '#/features/nodes/atoms';
import { Button } from '#/features/ui/button';
import { useMemoizedCallback } from '#/hooks/use-memoized-callback';

import { selectedNodeAtom } from '../editor.store';

function useEditorAppletRemoveNode({
  id,
  type,
  parent,
}: {
  id: string | null;
  type: string | null;
  parent: string | null;
}) {
  const setLayout = useSetAtom(appletLayoutAtom);
  const setSelectedNode = useSetAtom(selectedNodeAtom);

  return useMemoizedCallback(() => {
    if (id == null || parent == null || parent == 'root' || type == null) return;
    setLayout((layout) => {
      const getAllChildren = (id: string) => {
        const children = [...layout[id].children];
        if (children) {
          children.forEach((child) => {
            children.push(...getAllChildren(child));
          });
        }

        return children;
      };

      const allChildren = id ? getAllChildren(id) : [];
      const layoutCopy = clone(layout);
      for (const child of allChildren) {
        deleteStore(layoutCopy[child].type, child);
        delete layoutCopy[child];
      }
      deleteStore(type, id);
      delete layoutCopy[id];

      return setPath(
        [parent, 'children'],
        layoutCopy[parent].children.filter((child) => child !== id),
      )(layoutCopy);
    });

    setSelectedNode({ id: null, type: null, parent: null, validChildren: [] });
  });
}

export const DeleteNodeButton: FC = () => {
  const selectedNode = useAtomValue(selectedNodeAtom);

  const handleDeleteNode = useEditorAppletRemoveNode(selectedNode);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDeleteNode}
      disabled={
        selectedNode.type == null ||
        selectedNode.type === 'footer' ||
        selectedNode.type === 'grid' ||
        selectedNode.type === 'header' ||
        selectedNode.type === 'behaviors'
      }
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};
