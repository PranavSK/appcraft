import * as z from 'zod';
export const gridSchema = z.object({
  rowStart: z.coerce.number().int().min(0).max(6),
  rowEnd: z.coerce.number().int().min(0).max(6),
  columnStart: z.coerce.number().int().min(0).max(6),
  columnEnd: z.coerce.number().int().min(0).max(6),
});
export type GridState = z.infer<typeof gridSchema>;
