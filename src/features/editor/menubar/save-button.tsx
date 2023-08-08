import { getDefaultStore, useAtomValue } from 'jotai';
import { Save } from 'lucide-react';
import { type FC, useEffect, useState } from 'react';

import { appletIdAtom, storeToObject } from '#/features/applet/applet.store';
import { Button } from '#/features/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/features/ui/dialog';
import { Input } from '#/features/ui/input';
import { Label } from '#/features/ui/label';
import { useClearHistory, useReadHistory } from '#/lib/jotai';

import { onSaveAtom } from '../editor.store';

const ChangeNotification: FC = () => {
  const { stack, index } = useReadHistory();
  const hasChanges = stack.length > 0 && index > 0;
  if (!hasChanges) return null;
  return <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary" />;
};

export const SaveButton: FC = () => {
  const onSave = useAtomValue(onSaveAtom, { store: getDefaultStore() });
  const currentAppletId = useAtomValue(appletIdAtom, { store: getDefaultStore() });
  const [open, setOpen] = useState(false);
  const [appletId, setAppletId] = useState(currentAppletId ?? '');
  const clearHistory = useClearHistory();

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', handleShortcut);
    return () => {
      document.removeEventListener('keydown', handleShortcut);
    };
  }, [onSave]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="relative" size="icon" variant="outline">
          <ChangeNotification />
          <Save className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Applet</DialogTitle>
          <DialogDescription>
            Provide the Applet id to save your changes. Using the same id will overwrite the
            existing Applet.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
            if (!appletId) return;
            onSave(storeToObject(), appletId);
            clearHistory();
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="appletId" className="text-right">
                Applet Id
              </Label>
              <Input
                id="appletId"
                placeholder="Enter applet id"
                defaultValue={currentAppletId ?? undefined}
                value={appletId}
                onChange={(event) => setAppletId(event.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
