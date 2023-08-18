import * as z from 'zod';

export const schema = z.object({
  variant: z.enum(['default', 'success', 'error', 'disabled']),
  checked: z.boolean(),
  text: z.string().optional(),
  onCheckedChange: z.string().optional(),
});
export type CheckboxGroupItemState = z.infer<typeof schema>;
export const defaultState: CheckboxGroupItemState = {
  variant: 'default',
  checked: false,
};
export const childrenTypes = ['text', 'latex', 'image'] as const;
