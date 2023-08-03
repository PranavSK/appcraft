import { Undo } from 'lucide-react';
import { type FC, useEffect } from 'react';

import { Button } from '#/features/ui/button';
import { useUndo } from '#/lib/jotai';

export const UndoButton: FC = () => {
  const undo = useUndo();

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
        event.preventDefault();
        undo();
      }
    };

    document.addEventListener('keydown', handleShortcut);
    return () => {
      document.removeEventListener('keydown', handleShortcut);
    };
  }, [undo]);

  return (
    <Button size="icon" variant="outline" onClick={() => undo()}>
      <Undo className="h-4 w-4" />
    </Button>
  );
};
