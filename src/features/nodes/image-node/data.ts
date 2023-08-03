/**
 * Leaf node that represents an image.
 */
import * as z from 'zod';

export const imageSchema = z.object({
  src: z.string().url(),
  alt: z.string(),
});
export type ImageState = z.infer<typeof imageSchema>;
export const childrenTypes = [] as const;
export const defaultState: ImageState = {
  src: 'https://picsum.photos/32',
  alt: 'Placeholder',
};
