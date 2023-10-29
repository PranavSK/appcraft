import type { FC, SVGAttributes } from 'react';
import { keys, mapKeys, pipe } from 'remeda';

export const icons = pipe(
  import.meta.glob<FC<SVGAttributes<SVGElement>>>('./**.tsx', {
    import: 'Icon',
    eager: true,
  }),

  mapKeys((key) => key.replace('./', '').replace('.tsx', '')),
);

export const iconTypes = ['none', ...keys(icons)] as const;
