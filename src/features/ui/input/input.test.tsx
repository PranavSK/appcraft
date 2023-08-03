import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input } from './input';

describe('Input', () => {
  it('should render an input element', () => {
    render(<Input />);
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });
});
