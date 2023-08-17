import * as z from 'zod';

import { gridSchema } from '#/features/nodes/common/data';
export const schema = gridSchema;
export type CheckboxGroupState = z.infer<typeof schema>;
export const defaultState: CheckboxGroupState = {
  rowStart: 4,
  rowEnd: 5,
  columnStart: 1,
  columnEnd: 5,
};
export const childrenTypes = ['checkbox-group-item'] as const;
