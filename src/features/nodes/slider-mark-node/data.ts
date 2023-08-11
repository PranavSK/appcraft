import * as z from 'zod';

export const schema = z.object({
  mode: z.enum(['all', 'active', 'single']),
  position: z.coerce.number().min(0).max(100),
});
export type SliderMarkState = z.infer<typeof schema>;
export const defaultState: SliderMarkState = {
  mode: 'all',
  position: 0,
};
export const childrenTypes = ['text', 'latex', 'image'] as const;
