import { z } from 'zod';

import { gridSchema } from '#/features/nodes/common/data';

export const childrenTypes = ['text', 'latex', 'image', 'option', 'button'] as const;
export const schema = gridSchema.extend({
  textAlign: z.enum(['left', 'center', 'right']),
});
export type ParagraphState = z.infer<typeof schema>;
export const defaultState: ParagraphState = {
  textAlign: 'left',
  rowStart: 0,
  rowEnd: 1,
  columnStart: 0,
  columnEnd: 6,
};
