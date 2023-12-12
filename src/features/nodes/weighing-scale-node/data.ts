import * as z from 'zod';

import { gridSchema } from '#/features/nodes/common/data';
export const schema = gridSchema.extend({
  leftValue: z.coerce.number(),
  rightValue: z.coerce.number(),
  maxValueDifference: z.coerce.number(),
});
export type WeighingScaleState = z.infer<typeof schema>;
export const defaultState: WeighingScaleState = {
  rowStart: 0,
  rowEnd: 5,
  columnStart: 0,
  columnEnd: 6,
  leftValue: 0,
  rightValue: 0,
  maxValueDifference: 20,
};
export const childrenTypes = ['weighing-scale-pan'] as const;
