import { FC } from 'react';

import type { ErrorDisplayProps } from './error-display.types';

export const ErrorDisplay: FC<ErrorDisplayProps> = ({ statusCode, message }) => {
  return (
    <div
      data-testid="error-display"
      className="m-6 flex h-full flex-col items-center justify-center text-center"
    >
      <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">{statusCode}</h1>
      <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
        {message}
      </p>
    </div>
  );
};
