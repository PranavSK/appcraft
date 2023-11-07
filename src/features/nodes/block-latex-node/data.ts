import * as z from 'zod';

import { gridSchema } from '#/features/nodes/common/data';
import { getZodValidateLatex } from '#/lib/katex';
export const schema = gridSchema.extend({
  latex: z.string().superRefine(getZodValidateLatex(true)),
});
export type BlockLatexState = z.infer<typeof schema>;
export const defaultState: BlockLatexState = {
  rowStart: 4,
  rowEnd: 5,
  columnStart: 1,
  columnEnd: 5,
  latex: '\\frac{1}{2}',
};
export const childrenTypes = [] as const;
