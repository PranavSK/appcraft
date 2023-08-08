import * as z from 'zod';

export const iconTypes = ['none', 'start', 'retry', 'try-new'] as const;

export const schema = z.object({
  icon: z.enum(iconTypes),
  label: z.string().nonempty(),
  onClick: z.string().optional(),
});
export type CtaState = z.infer<typeof schema>;
export const defaultState: CtaState = {
  icon: 'none',
  label: 'Next',
};
export const childrenTypes = [] as const;
