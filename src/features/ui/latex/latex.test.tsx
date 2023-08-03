import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Latex } from './latex';

describe('Latex', () => {
  it('should render html displaying the latex', () => {
    render(<Latex latex="\\sqrt{2}" />);
    expect(screen.getByTestId('latex')).toMatchSnapshot();
  });
});
