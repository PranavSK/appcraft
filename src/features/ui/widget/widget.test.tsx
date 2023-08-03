import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Widget } from './widget';

describe('Widget', () => {
  it('should render a widget', () => {
    render(
      <Widget rowStart={1} rowEnd={2} columnStart={1} columnEnd={9}>
        <p>Some text</p>
      </Widget>,
    );
    expect(screen.getByTestId('widget')).toBeInTheDocument();
  });
});
