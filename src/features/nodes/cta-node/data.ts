import * as z from 'zod';

import { iconTypes } from '#/features/cta-icons';

export const schema = z.object({
  variant: z.enum(['default', 'outline']),
  icon: z.enum(iconTypes),
  label: z.string().nonempty(),
  disabled: z.boolean(),
  onClick: z.string().optional(),
});
export type CtaState = z.infer<typeof schema>;
export const defaultState: CtaState = {
  variant: 'default',
  icon: 'none',
  label: 'Next',
  disabled: false,
};
export const childrenTypes = [] as const;
