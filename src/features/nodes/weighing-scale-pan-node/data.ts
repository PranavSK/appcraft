import * as z from 'zod';

import { hexColor } from '#/lib/zod';

export const schema = z.object({
  showBorder: z.boolean(),
  borderColor: hexColor,
  showBackground: z.boolean(),
  backgroundColor: hexColor,
});
export type WeighingScalePanState = z.infer<typeof schema>;
export const defaultState: WeighingScalePanState = {
  showBackground: true,
  backgroundColor: '#E7FBFF',
  showBorder: true,
  borderColor: '#1CB9D9',
};
export const childrenTypes = ['text', 'latex', 'image'] as const;
