import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PopoverContent } from './popover';

describe('Popover', () => {
  it('should render a popover', () => {
    render(<PopoverContent>Popover</PopoverContent>);
    expect(screen.getByTestId('popover-content')).toBeInTheDocument();
  });
});
