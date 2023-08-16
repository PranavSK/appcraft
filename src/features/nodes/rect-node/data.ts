import * as z from 'zod';

import { gridSchema } from '#/features/nodes/common/data';
import { hexColor } from '#/lib/zod';
export const schema = gridSchema.extend({
  showFill: z.boolean(),
  fillColor: hexColor,
  showBorder: z.boolean(),
  borderColor: hexColor,
});
export type RectState = z.infer<typeof schema>;
export const defaultState: RectState = {
  rowStart: 0,
  rowEnd: 10,
  columnStart: 0,
  columnEnd: 14,
  showFill: true,
  fillColor: '#E7FBFF',
  showBorder: false,
  borderColor: '#E7FBFF',
};
export const childrenTypes = [] as const;
// TODO:  Add support for gradients.
