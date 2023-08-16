import * as z from 'zod';

export const schema = z.object({
  value: z.string().nonempty(),
  text: z.string().optional(),
});
export type OptionItemState = z.infer<typeof schema>;
export const defaultState: OptionItemState = {
  value: 'item',
};
export const childrenTypes = ['text', 'latex', 'image'] as const;
