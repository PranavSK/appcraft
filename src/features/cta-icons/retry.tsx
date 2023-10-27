import type { FC, SVGAttributes } from 'react';

export const Icon: FC<SVGAttributes<SVGElement>> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21.4219 3V8H16.4219" />
      <path d="M21.3719 12.9996C21.1504 15.0054 20.2612 16.8786 18.8471 18.3183C17.433 19.758 15.5761 20.6807 13.5746 20.9382C11.5731 21.1956 9.54309 20.773 7.81067 19.7381C6.07824 18.7031 4.7439 17.116 4.02193 15.2316C3.29997 13.3471 3.23228 11.2747 3.82974 9.34717C4.42719 7.41963 5.65512 5.74881 7.31632 4.60304C8.97752 3.45728 10.9756 2.90305 12.9896 3.02938C15.0037 3.1557 16.9169 3.95525 18.4219 5.29961L21.4219 7.99961" />
    </svg>
  );
};
