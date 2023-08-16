import * as z from 'zod';

import { GeogebraAppApi } from '#/features/integrations/geogebra';
import { gridSchema } from '#/features/nodes/common/data';

export const childrenTypes = [] as const;
export const schema = gridSchema.extend({
  materialId: z.string(),
});
export interface GeogebraState extends z.infer<typeof schema> {
  api?: GeogebraAppApi | null;
}
export const defaultState: GeogebraState = {
  materialId: 'jusnnrwa',
  api: null,
  rowStart: 2,
  rowEnd: 12,
  columnStart: 0,
  columnEnd: 14,
};
