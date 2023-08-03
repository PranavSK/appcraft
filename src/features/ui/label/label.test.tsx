import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Label } from './label';

describe('Label', () => {
  it('should render a label', () => {
    render(<Label htmlFor="email">Email</Label>);
    expect(screen.getByTestId('label')).toBeInTheDocument();
  });
});
