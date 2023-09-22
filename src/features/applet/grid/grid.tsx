import { FC } from 'react';

import { ChildrenNode } from '#/features/nodes/common/components';
import { WidgetGrid } from '#/features/ui/widget';

export const Grid: FC = () => (
  <WidgetGrid className="z-10 m-5">
    <ChildrenNode id={'grid'} />
  </WidgetGrid>
);
