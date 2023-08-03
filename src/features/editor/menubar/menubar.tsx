import { type FC } from 'react';

import { BreakpointTabs } from './breakpoint-tabs';
import { RedoButton } from './redo-button';
import { SaveButton } from './save-button';
import { UndoButton } from './undo-button';

export const Menubar: FC = () => {
  return (
    <div className="flex items-center justify-end space-x-2 bg-background p-4 text-foreground">
      <BreakpointTabs />
      <UndoButton />
      <RedoButton />
      <SaveButton />
    </div>
  );
};
