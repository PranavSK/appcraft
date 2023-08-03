import { type FC } from 'react';

import { ScrollArea } from '#/features/ui/scroll-area';

import { AddNodeButton } from './add-node-button';
import { DeleteNodeButton } from './delete-node-button';
import { MoveNodeButton } from './move-node-button';
import { NodeTree } from './node-tree';

export const NodeLayoutEditor: FC = () => {
  return (
    <ScrollArea className="h-screen bg-secondary text-secondary-foreground">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex justify-end gap-1">
          <MoveNodeButton direction="up" />
          <MoveNodeButton direction="down" />
          <AddNodeButton />
          <DeleteNodeButton />
        </div>
        <NodeTree />
      </div>
    </ScrollArea>
  );
};
