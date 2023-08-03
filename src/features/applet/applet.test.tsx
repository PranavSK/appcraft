import { composeStories } from '@storybook/react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import * as stories from './applet.stories';

const { Default } = composeStories(stories);

afterEach(cleanup);
describe('Applet', () => {
  it('should render by default', () => {
    render(<Default />);
    expect(screen.getByTestId('applet')).toBeInTheDocument();
  });
});
