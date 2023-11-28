import * as z from 'zod';

import { gridSchema } from '#/features/nodes/common/data';
import { hexColor } from '#/lib/zod';
export const schema = gridSchema
  .extend({
    columns: z.coerce.number().min(1).max(100).default(2),
    rows: z.coerce.number().min(1).max(100).default(2),
    showHeader: z.boolean().default(true),
    headerColor: hexColor,
    highlightColor: hexColor,
    highlightType: z.enum(['row', 'column', 'cell', 'none']).default('none'),
    highlightIndex: z.coerce.number().min(0),
  })
  .superRefine(({ highlightType, highlightIndex, rows, columns }, ctx) => {
    if (highlightType === 'row' && highlightIndex >= rows) {
      return ctx.addIssue({
        type: 'number',
        code: z.ZodIssueCode.too_big,
        maximum: rows - 1,
        inclusive: true,
        exact: true,
        path: ['highlightIndex'],
      });
    } else if (highlightType === 'column' && highlightIndex >= columns) {
      return ctx.addIssue({
        type: 'number',
        code: z.ZodIssueCode.too_big,
        maximum: columns - 1,
        inclusive: true,
        exact: true,
        path: ['highlightIndex'],
      });
    }
  });
export type TableState = z.infer<typeof schema>;
export const defaultState: TableState = {
  rowStart: 0,
  rowEnd: 4,
  columnStart: 0,
  columnEnd: 6,
  columns: 2,
  rows: 2,
  showHeader: true,
  headerColor: '#c7c7c7',
  highlightColor: '#E7FBFF',
  highlightType: 'none',
  highlightIndex: 0,
};
export const childrenTypes = ['table-cell'] as const;
