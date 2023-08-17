import * as z from 'zod';

import { gridSchema } from '#/features/nodes/common/data';
export const schema = gridSchema.extend({
  value: z.coerce.string().optional(),
  onValueChange: z.string().optional(),
});
export type RadioGroupState = z.infer<typeof schema>;
export const defaultState: RadioGroupState = {
  rowStart: 4,
  rowEnd: 5,
  columnStart: 2,
  columnEnd: 3,
};
export const childrenTypes = ['radio-group-item'] as const;
