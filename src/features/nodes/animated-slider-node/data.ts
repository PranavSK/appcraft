import * as z from 'zod';

import { gridSchema } from '#/features/nodes/common/data';
export const schema = gridSchema.extend({
  value: z.coerce.number(),
  state: z.enum(['playing', 'paused']),
  min: z.coerce.number(),
  max: z.coerce.number(),
  step: z.coerce.number(),
  interval: z.coerce.number(),
  onValueChange: z.string().optional(),
  onStateChange: z.string().optional(),
});
export type AnimatedSliderState = z.infer<typeof schema>;
export const defaultState: AnimatedSliderState = {
  value: 0,
  state: 'paused',
  min: 0,
  max: 1,
  step: 0.1,
  interval: 200,
  rowStart: 5,
  rowEnd: 6,
  columnStart: 1,
  columnEnd: 5,
};
export const childrenTypes = [] as const;
