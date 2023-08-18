import * as z from 'zod';

export const schema = z.object({
  variant: z.enum(['default', 'success', 'error', 'disabled']),
  value: z.coerce.string().optional(),
  onValueChange: z.string().optional(),
  open: z.boolean().optional(),
  onOpenChange: z.string().optional(),
});
export type OptionState = z.infer<typeof schema>;
export const defaultState: OptionState = { variant: 'default' };
export const childrenTypes = ['option-item'] as const;
