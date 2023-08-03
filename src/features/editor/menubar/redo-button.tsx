import { Redo } from 'lucide-react';
import { type FC, useEffect } from 'react';

import { Button } from '#/features/ui/button';
import { useRedo } from '#/lib/jotai';

export const RedoButton: FC = () => {
  const redo = useRedo();

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'y') {
        event.preventDefault();
        redo();
      }
    };

    document.addEventListener('keydown', handleShortcut);
    return () => {
      document.removeEventListener('keydown', handleShortcut);
    };
  }, [redo]);

  return (
    <Button size="icon" variant="outline" onClick={() => redo()}>
      <Redo className="h-4 w-4" />
    </Button>
  );
};
