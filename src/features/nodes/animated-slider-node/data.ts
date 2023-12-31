import * as z from 'zod';

import { gridSchema } from '#/features/nodes/common/data';
export const schema = gridSchema
  .extend({
    value: z.coerce.number(),
    state: z.enum(['playing', 'paused']),
    min: z.coerce.number(),
    max: z.coerce.number(),
    step: z.coerce.number(),
    interval: z.coerce.number().min(100),
    onValueChange: z.string().optional(),
    onStateChange: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.min > data.max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Min must be less than or equal to max',
        path: ['min'],
      });
    }

    if (data.step <= 0) {
      ctx.addIssue({
        type: 'number',
        code: z.ZodIssueCode.too_small,
        minimum: 0,
        inclusive: false,
        exact: true,
        message: 'Step must be greater than 0',
        path: ['step'],
      });
    }

    if (data.value < data.min || data.value > data.max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Value must be between min and max',
        path: ['value'],
      });
    }

    if (data.step > data.max - data.min) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Step must be less than or equal to max - min',
        path: ['step'],
      });
    }
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
