import { FC } from 'react';

import { ChildrenNode } from '#/features/nodes/common/components';
import { WidgetGrid } from '#/features/ui/widget';

export const Grid: FC = () => (
  <WidgetGrid className="m-5 grow">
    <ChildrenNode id={'grid'} />
  </WidgetGrid>
);
