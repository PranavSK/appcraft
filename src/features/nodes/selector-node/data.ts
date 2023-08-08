import * as z from 'zod';

export const schema = z.object({
  activeIndex: z.coerce.number(),
});
export type SelectorState = z.infer<typeof schema>;
export const defaultState: SelectorState = {
  activeIndex: 0,
};
export const childrenTypes = ['group'] as const;
