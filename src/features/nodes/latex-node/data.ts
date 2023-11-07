import * as z from 'zod';

import { getZodValidateLatex } from '#/lib/katex';

export const latexSchema = z.object({
  latex: z.string().superRefine(getZodValidateLatex(false)),
});
export type LatexState = z.infer<typeof latexSchema>;
export const childrenTypes = [] as const;
export const defaultState: LatexState = {
  latex: '\\frac{1}{2}',
};
