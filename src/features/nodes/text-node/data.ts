import * as z from 'zod';

import { hexColor } from '#/lib/zod';

export const textSchema = z.object({
  text: z.string(),
  color: hexColor.optional(),
});
export type TextState = z.infer<typeof textSchema>;
export const childrenTypes = [] as const;
export const defaultState: TextState = {
  text: 'Sample Text',
  color: undefined,
};
