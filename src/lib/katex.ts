import katex from 'katex';
import { type SuperRefinement, ZodIssueCode } from 'zod';

export const zodValidateLatex: SuperRefinement<string> = (val, ctx) => {
  try {
    katex.renderToString(val, {
      displayMode: false,
      macros: {},
      throwOnError: true,
    });
  } catch (err) {
    if (err instanceof katex.ParseError) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: `Invalid LaTeX at ${err.position}: ${err.message}`,
      });
      return false;
    }
  }

  return true;
};
