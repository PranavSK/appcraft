import type { FC, SVGAttributes } from 'react';
export const BarPivot: FC<SVGAttributes<SVGGElement>> = (props) => (
  <g {...props}>
    <circle cx={18} cy={18} r={18} fill="#918F90" />
    <circle cx={18} cy={18} r={6} fill="#58595B" />
  </g>
);
