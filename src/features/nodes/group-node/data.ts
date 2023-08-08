import * as z from 'zod';

export const schema = z.object({
  name: z.string(),
  active: z.boolean().default(true),
});
export type GroupState = z.infer<typeof schema>;
export const defaultState: GroupState = {
  name: '',
  active: true,
};
export const childrenTypes = [] as const;
