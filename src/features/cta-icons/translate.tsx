import type { FC, SVGAttributes } from 'react';

export const Icon: FC<SVGAttributes<SVGElement>> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.3333 3.66667L13 1M13 1L15.6667 3.66667M13 1V25M13 25L10.3333 22.3333M13 25L15.6667 22.3333M3.66667 15.6667L0.999999 13M0.999999 13L3.66667 10.3333M0.999999 13H25M25 13L22.3333 15.6667M25 13L22.3333 10.3333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
