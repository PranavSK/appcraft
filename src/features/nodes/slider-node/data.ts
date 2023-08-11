import * as z from 'zod';

import { gridSchema } from '#/features/nodes/common';

export const childrenTypes = ['slider-label', 'slider-mark'] as const;
export const schema = gridSchema
  .extend({
    defaultValue: z.coerce.number(),
    min: z.coerce.number(),
    max: z.coerce.number(),
    step: z.coerce.number(),
    onValueChange: z.string().optional(),
    onValueCommit: z.string().optional(),
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

    if (data.defaultValue < data.min || data.defaultValue > data.max) {
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
export type SliderState = z.infer<typeof schema>;
export const defaultState: SliderState = {
  defaultValue: 0,
  min: 0,
  max: 1,
  step: 0.1,
  rowStart: 11,
  rowEnd: 14,
  columnStart: 1,
  columnEnd: 13,
};
