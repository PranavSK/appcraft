import { type FC } from 'react';

import { ChildrenNode } from '#/features/nodes/common/components';

import { useHasChildren } from '../applet.store';

export const Footer: FC = () => {
  const hasChildren = useHasChildren('footer');
  if (!hasChildren) return null;
  return (
    <div className="z-20 m-5 flex items-center justify-center gap-5">
      <ChildrenNode id={'footer'} />
    </div>
  );
};
