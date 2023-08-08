import * as z from 'zod';

import { gridSchema } from '#/features/nodes/common';

export const childrenTypes = ['text', 'latex', 'image'] as const;
const marksSchema = z.record(z.coerce.number(), z.string());
export const schema = gridSchema
  .extend({
    value: z.coerce.number(),
    min: z.coerce.number(),
    max: z.coerce.number(),
    step: z.coerce.number(),
    marks: z.string().optional(),
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

    if (data.marks && data.marks.toLowerCase() !== 'all') {
      try {
        const json = JSON.parse(data.marks);
        marksSchema.parse(json);
      } catch (e) {
        if (e instanceof z.ZodError) {
          for (const issue of e.issues) {
            ctx.addIssue({
              ...issue,
              path: ['marks', ...issue.path],
            });
          }
        }
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Marks must be valid JSON or 'all' or empty.",
          path: ['marks'],
        });
      }
    }
  });
export type SliderMarksState = z.infer<typeof marksSchema>;
export type SliderState = z.infer<typeof schema>;
export const defaultState: SliderState = {
  value: 0,
  min: 0,
  max: 1,
  step: 0.1,
  rowStart: 11,
  rowEnd: 14,
  columnStart: 1,
  columnEnd: 13,
  marks: 'all',
};
