import { ComponentPropsWithoutRef, type FC } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { ErrorDisplay } from '#/features/ui/error-display';

function getError(error: unknown): ComponentPropsWithoutRef<typeof ErrorDisplay> {
  if (isRouteErrorResponse(error)) {
    return { statusCode: `${error.status}`, message: error.statusText };
  } else if (error instanceof Error) {
    return { statusCode: error.name, message: error.message };
  }
  return { statusCode: 'Err', message: 'An unknown error occurred.' };
}

export const ErrorPage: FC = () => {
  const error = useRouteError();

  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <ErrorDisplay {...getError(error)} />
    </section>
  );
};
