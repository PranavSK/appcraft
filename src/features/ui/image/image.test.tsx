import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Image } from './image';

describe('Image', () => {
  it('should render an image', () => {
    render(<Image src="https://example.com/image.png" alt="alt text" />);
    expect(screen.getByAltText('alt text')).toBeInTheDocument();
  });
});
