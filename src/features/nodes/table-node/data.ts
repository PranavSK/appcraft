import * as z from 'zod';

import { gridSchema } from '#/features/nodes/common/data';
import { hexColor } from '#/lib/zod';
export const schema = gridSchema.extend({
  rows: z.coerce.number().min(1).max(6).default(1),
  columns: z.coerce.number().min(1).max(6).default(1),
  showBorder: z.boolean().default(true),
  showGrid: z.boolean().default(true),
  showHeaderBackground: z.boolean().default(true),
  headerColor: hexColor.default('#1a1a1a'),
  rowHighlightIndex: z.number().min(1).max(6).or(z.literal('none')).default('none'),
  rowHighlightColor: hexColor.default('#c7c7c7'),
});
export type TableState = z.infer<typeof schema>;
export const defaultState: TableState = {
  rowStart: 0,
  rowEnd: 4,
  columnStart: 0,
  columnEnd: 6,
  rows: 3,
  columns: 3,
  showBorder: true,
  showGrid: true,
  showHeaderBackground: true,
  headerColor: '#1a1a1a',
  rowHighlightIndex: 'none',
  rowHighlightColor: '#c7c7c7',
};
export const childrenTypes = [
  'paragraph',
  'geogebra',
  'rect',
  'slider',
  'animated-slider',
  'stepper',
  'radio-group',
  'checkbox-group',
  'button-group',
] as const;
