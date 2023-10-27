import type { FC, SVGAttributes } from 'react';
import { mapKeys, pipe } from 'remeda';

export const icons = pipe(
  import.meta.glob<FC<SVGAttributes<SVGElement>>>('./**.tsx', {
    import: 'Icon',
    eager: true,
  }),

  mapKeys((key) => key.replace('./', '').replace('.tsx', '')),
);
