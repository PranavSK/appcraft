import { useAtomValue, useSetAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { nanoid } from 'nanoid';
import { type FC, useState } from 'react';
import { clone, pipe, setPath } from 'remeda';

import { appletLayoutAtom } from '#/features/applet';
import { getNodeChildrenTypes, getStore } from '#/features/nodes';
import { Button } from '#/features/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '#/features/ui/popover';

import { selectedNodeAtom } from '../editor.store';

function useEditorAppletAddChild(id: string | null, type: string | null) {
  const setLayout = useSetAtom(appletLayoutAtom);

  return (childType: string) => {
    setLayout((layout) => {
      if (id == null || type == null) return layout;
      const childId = nanoid(6);
      let layoutCopy = clone(layout);
      const selectedNodeData = layoutCopy[id];
      const children = [...selectedNodeData.children, childId];

      // Initialize the atom family for the child node.
      getStore(childType, childId);

      layoutCopy = pipe(
        layoutCopy,
        setPath([id, 'children'], children),
        setPath([childId], { type: childType, children: [] }),
      );
      return layoutCopy;
    });
  };
}

export const AddNodeButton: FC = () => {
  const { id: selectedNodeId, type: selectedNodeType } = useAtomValue(selectedNodeAtom);
  const [showAddChildPopover, setShowAddChildPopover] = useState(false);
  const validChildren = selectedNodeType != null ? getNodeChildrenTypes(selectedNodeType) : [];
  const hasValidChildren = validChildren.length > 0;
  const handleAddChild = useEditorAppletAddChild(selectedNodeId, selectedNodeType);

  return (
    <Popover open={showAddChildPopover} onOpenChange={setShowAddChildPopover}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent collisionPadding={10}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Add Child</h4>
            {hasValidChildren ? (
              <div className="grid gap-2">
                {validChildren.map((childType) => (
                  <Button
                    key={childType}
                    size="sm"
                    onClick={() => {
                      setShowAddChildPopover(false);
                      handleAddChild(childType);
                    }}
                  >
                    {childType}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No valid child types for selected node.
              </p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
