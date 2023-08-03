import * as z from 'zod';

import { zodValidateLatex } from '#/lib/katex';

export const latexSchema = z.object({
  latex: z.string().superRefine(zodValidateLatex),
});
export type LatexState = z.infer<typeof latexSchema>;
export const childrenTypes = [] as const;
export const defaultState: LatexState = {
  latex: '\\frac{1}{2}',
};
