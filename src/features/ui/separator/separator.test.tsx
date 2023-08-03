import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Separator } from './separator';

describe('Separator', () => {
  it('should render', () => {
    render(<Separator />);
    // check if component renders
    const text = screen.getByTestId('separator');
    expect(text).toBeInTheDocument();
  });
});
