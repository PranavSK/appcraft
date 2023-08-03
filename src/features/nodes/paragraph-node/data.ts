import { gridSchema, type GridState } from '#/features/nodes/common';

export const childrenTypes = ['text', 'latex', 'image'] as const;
export const schema = gridSchema;
export type ParagraphState = GridState;
export const defaultState: ParagraphState = {
  rowStart: 0,
  rowEnd: 1,
  columnStart: 0,
  columnEnd: 7,
};
