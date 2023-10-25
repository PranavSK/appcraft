import * as z from 'zod';

export const schema = z.object({
  variant: z.enum(['default', 'success', 'error', 'disabled']),
  value: z.string().nonempty(),
  text: z.string().optional(),
  showIcon: z.boolean().optional(),
});
export type RadioGroupItemState = z.infer<typeof schema>;
export const defaultState: RadioGroupItemState = {
  variant: 'default',
  value: 'Item',
  showIcon: true,
};
export const childrenTypes = ['text', 'latex', 'image'] as const;
