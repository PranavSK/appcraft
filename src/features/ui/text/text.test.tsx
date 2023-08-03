import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Text } from './text';

describe('Text', () => {
  it('should render text', () => {
    render(<Text text="Hello World" />);
    expect(screen.getByTestId('text')).toHaveTextContent('Hello World');
  });
});
