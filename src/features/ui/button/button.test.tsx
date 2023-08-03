import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Button } from './button';

afterEach(cleanup);
describe('Button', () => {
  it('should render a button', () => {
    render(<Button />);
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });
  it('should render a disabled button', () => {
    render(<Button disabled />);
    expect(screen.getByTestId('button')).toBeDisabled();
  });
  it('should render a button as a link, checks for href attribute', () => {
    render(
      <Button asChild>
        <a href="/login">Login</a>
      </Button>,
    );
    expect(screen.getByTestId('button')).toHaveAttribute('href');
  });
});
