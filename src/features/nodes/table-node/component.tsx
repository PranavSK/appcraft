import { useAtomValue } from 'jotai';
import { type CSSProperties, type FC } from 'react';

import { ChildrenNode } from '#/features/nodes/common/components';
import { Widget } from '#/features/ui/widget';
import { cn } from '#/lib/utils';

import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

const TW_GRID_ROWS_LIST = [
  'DUMMY', // DUMMY
  'grid-rows-1',
  'grid-rows-2',
  'grid-rows-3',
  'grid-rows-4',
  'grid-rows-5',
  'grid-rows-6',
];

const TW_GRID_COLUMNS_LIST = [
  'DUMMY', // DUMMY
  'grid-cols-1',
  'grid-cols-2',
  'grid-cols-3',
  'grid-cols-4',
  'grid-cols-5',
  'grid-cols-6',
];

const TW_HEADER_SELECTOR_LIST = [
  'DUMMY', // DUMMY
  '[&>*:nth-child(-n+1)]:bg-[var(--tbl-header-color, #1a1a1a)] text-white',
  '[&>*:nth-child(-n+2)]:bg-[var(--tbl-header-color, #1a1a1a)] text-white',
  '[&>*:nth-child(-n+3)]:bg-[var(--tbl-header-color, #1a1a1a)] text-white',
  '[&>*:nth-child(-n+4)]:bg-[var(--tbl-header-color, #1a1a1a)] text-white',
  '[&>*:nth-child(-n+5)]:bg-[var(--tbl-header-color, #1a1a1a)] text-white',
  '[&>*:nth-child(-n+6)]:bg-[var(--tbl-header-color, #1a1a1a)] text-white',
];

interface CustomStyle extends CSSProperties {
  '--tbl-header-color': string;
}

export const Component: FC<NodeProps> = ({ id, className }) => {
  const { rows, columns, showBorder, showGrid, showHeaderBackground, headerColor, ...state } =
    useAtomValue(nodeStateAtomFamily(id));
  return (
    <Widget
      className={cn(
        'grid gap-[1px] [&>*]:bg-white',
        showBorder && 'border border-[#1a1a1a]',
        showGrid && 'bg-[#1a1a1a]',
        showHeaderBackground && TW_HEADER_SELECTOR_LIST[columns],
        TW_GRID_ROWS_LIST[rows],
        TW_GRID_COLUMNS_LIST[columns],
        className,
      )}
      style={
        {
          '--tbl-header-color': headerColor,
        } as CustomStyle
      }
      {...state}
    >
      <ChildrenNode id={id} />
    </Widget>
  );
};
