import * as z from 'zod';

import { hexColor } from '#/lib/zod';

export const textSchema = z.object({
  text: z.coerce.string(),
  color: hexColor,
  highlight: z.boolean(),
  highlightColor: hexColor,
});
export type TextState = z.infer<typeof textSchema>;
export const childrenTypes = [] as const;
export const defaultState: TextState = {
  text: 'Sample Text',
  color: '#212121',
  highlight: false,
  highlightColor: '#E7FBFF',
};
