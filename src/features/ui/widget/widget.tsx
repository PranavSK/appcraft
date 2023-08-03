import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';
import { clamp } from 'remeda';

import { cn } from '#/lib/utils';

import type { WidgetProps } from './widget.types';

const TW_GRID_ROW_START_LIST = [
  'row-start-1',
  'row-start-2',
  'row-start-3',
  'row-start-4',
  'row-start-5',
  'row-start-6',
  'row-start-7',
  'row-start-8',
  'row-start-9',
  'row-start-10',
  'row-start-11',
  'row-start-12',
  'row-start-13',
  'row-start-14',
  'row-start-15',
];
const TW_GRID_ROW_END_LIST = [
  'row-end-1',
  'row-end-2',
  'row-end-3',
  'row-end-4',
  'row-end-5',
  'row-end-6',
  'row-end-7',
  'row-end-8',
  'row-end-9',
  'row-end-10',
  'row-end-11',
  'row-end-12',
  'row-end-13',
  'row-end-14',
  'row-end-15',
];
const TW_GRID_COL_START_LIST = [
  'col-start-1',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
  'col-start-8',
  'col-start-9',
  'col-start-10',
  'col-start-11',
  'col-start-12',
  'col-start-13',
  'col-start-14',
  'col-start-15',
];
const TW_GRID_COL_END_LIST = [
  'col-end-1',
  'col-end-2',
  'col-end-3',
  'col-end-4',
  'col-end-5',
  'col-end-6',
  'col-end-7',
  'col-end-8',
  'col-end-9',
  'col-end-10',
  'col-end-11',
  'col-end-12',
  'col-end-13',
  'col-end-14',
  'col-end-15',
];

export const Widget = forwardRef<HTMLDivElement, WidgetProps>(
  ({ rowStart, rowEnd, columnStart, columnEnd, className, asChild, ...props }, ref) => {
    const clampedRowStart = clamp(rowStart, { min: 0, max: 14 });
    const clampedRowEnd = clamp(rowEnd, { min: 0, max: 14 });
    const clampedColumnStart = clamp(columnStart, { min: 0, max: 14 });
    const clampedColumnEnd = clamp(columnEnd, { min: 0, max: 14 });

    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        data-testid="widget"
        className={cn(
          TW_GRID_ROW_START_LIST[clampedRowStart],
          TW_GRID_ROW_END_LIST[clampedRowEnd],
          TW_GRID_COL_START_LIST[clampedColumnStart],
          TW_GRID_COL_END_LIST[clampedColumnEnd],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Widget.displayName = 'Widget';
