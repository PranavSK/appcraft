import * as z from 'zod';

import { gridSchema } from '#/features/nodes/common/data';
export const schema = gridSchema;
export type ButtonGroupState = z.infer<typeof schema>;
export const defaultState: ButtonGroupState = {
  rowStart: 4,
  rowEnd: 5,
  columnStart: 2,
  columnEnd: 3,
};
export const childrenTypes = ['button'] as const;
