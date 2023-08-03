import { useAtomValue } from 'jotai';
import { ClipboardCopy } from 'lucide-react';
import { type FC, Suspense } from 'react';

import { getNodePropertyEditor } from '#/features/nodes';
import { Button } from '#/features/ui/button';
import { ScrollArea } from '#/features/ui/scroll-area';
import { Separator } from '#/features/ui/separator';
import { copyToClipboard } from '#/lib/utils';

import { selectedNodeAtom } from '../editor.store';

export const PropertyEditor: FC = () => {
  const { id, type } = useAtomValue(selectedNodeAtom);

  if (type == null || id == null || type === 'grid' || type === 'footer' || type === 'header')
    return <div className="bg-secondary" />;

  const NodePropertyEditor = getNodePropertyEditor(type);
  return (
    <ScrollArea className="h-screen bg-secondary text-secondary-foreground">
      <div className="space-y-4 p-4">
        {id && type && (
          <>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={() => copyToClipboard(id)}>
                Id - {id}
                <ClipboardCopy className="ml-1 h-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => copyToClipboard(type)}>
                Type - {type}
                <ClipboardCopy className="ml-1 h-4" />
              </Button>
            </div>
            <Separator />
          </>
        )}
        <Suspense>
          <NodePropertyEditor id={id} />
        </Suspense>
      </div>
    </ScrollArea>
  );
};
