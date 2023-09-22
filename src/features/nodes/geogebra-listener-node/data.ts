import * as z from 'zod';

export const schema = z.object({
  object: z.string(),
  onObjectValueChanged: z.string(),
});
export type GeogebraListenerState = z.infer<typeof schema>;
export const defaultState: GeogebraListenerState = {
  object: '',
  onObjectValueChanged: '',
};
export const childrenTypes = [] as const;
