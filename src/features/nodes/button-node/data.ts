import * as z from 'zod';

import { iconTypes } from '#/features/cta-icons';
export const schema = z.object({
  icon: z.enum(iconTypes),
  label: z.string().nonempty(),
  disabled: z.boolean(),
  onClick: z.string().optional(),
});
export type ButtonState = z.infer<typeof schema>;
export const defaultState: ButtonState = {
  icon: 'none',
  label: 'Button',
  disabled: false,
};
export const childrenTypes = [] as const;
