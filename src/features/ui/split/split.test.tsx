import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Split } from './split';

describe('Split', () => {
  it('renders foo', () => {
    render(<Split />);
    // check if component renders text learn
    const text = screen.getByText(/learn/i);
    expect(text).toBeVisible();
  });
});
