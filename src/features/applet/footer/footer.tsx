import { useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { FC, useCallback } from 'react';

import { ChildrenNode } from '#/features/nodes/common';

import { appletLayoutAtom } from '..';

export const Footer: FC = () => {
  const hasChildren = useAtomValue(
    selectAtom(
      appletLayoutAtom,
      useCallback((layout) => layout.footer.children.length > 0, []),
    ),
  );
  if (!hasChildren) return null;
  return (
    <div className="mx-8 mb-8 flex w-full items-center justify-center gap-5">
      <ChildrenNode id={'footer'} />
    </div>
  );
};
