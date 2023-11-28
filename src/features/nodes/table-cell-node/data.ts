import * as z from 'zod';

export const schema = z.object({
  colspan: z.coerce.number().min(1).max(1000).default(1),
  rowspan: z.coerce.number().min(0).max(1000).default(1),
});
export type TableCellState = z.infer<typeof schema>;
export const defaultState: TableCellState = {
  colspan: 1,
  rowspan: 1,
};
export const childrenTypes = [
  'text',
  'line-break',
  'latex',
  'image',
  'option',
  'button',
  'checkbox-group-item',
] as const;
