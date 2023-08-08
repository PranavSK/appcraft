import { FC } from 'react';

import { ChildrenNode } from '#/features/nodes/common/components';
import { WidgetGrid } from '#/features/ui/widget';

export const Grid: FC = () => (
  <WidgetGrid className="mx-8 my-5 grow first:mt-8 last:mb-8">
    <ChildrenNode id={'grid'} />
  </WidgetGrid>
);
