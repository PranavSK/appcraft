import * as z from 'zod';

import { gridSchema } from '#/features/nodes/common/data';

export const childrenTypes = ['geogebra-listener'] as const;
export const schema = gridSchema.extend({
  materialId: z.string(),
});
export interface GeogebraState extends z.infer<typeof schema> {
  transparent: boolean;
}
export const defaultState: GeogebraState = {
  materialId: 'jusnnrwa',
  transparent: false,
  rowStart: 1,
  rowEnd: 5,
  columnStart: 0,
  columnEnd: 6,
};
