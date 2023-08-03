import * as z from 'zod';
export const gridSchema = z.object({
  rowStart: z.coerce.number().int().min(0).max(14),
  rowEnd: z.coerce.number().int().min(0).max(14),
  columnStart: z.coerce.number().int().min(0).max(14),
  columnEnd: z.coerce.number().int().min(0).max(14),
});
export type GridState = z.infer<typeof gridSchema>;
