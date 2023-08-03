import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ErrorDisplay } from './error-display';

describe('ErrorDisplay', () => {
  it('should render the error message and the status code', () => {
    render(<ErrorDisplay statusCode="404" message="Page not found" />);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
