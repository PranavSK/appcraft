import { HTMLAttributes } from 'react';

import type { GeogebraAppApi } from './geogebra.app.types';

export interface GeogebraProps extends HTMLAttributes<HTMLDivElement> {
  materialId?: string;
}

export interface GeogebraRef {
  api: GeogebraAppApi | null;
}
