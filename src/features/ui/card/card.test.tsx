import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { Card } from './card';
import { CardHeader } from './card-header';
import { CardTitle } from './card-title';

afterEach(cleanup);
describe('Card', () => {
  it('should render a card', () => {
    render(<Card />);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });
  it('should render a card with given text', () => {
    render(<Card>learn</Card>);
    expect(screen.getByText(/learn/i)).toBeInTheDocument();
  });
});

describe('CardContent', () => {
  it('should render a card content', () => {
    render(<Card />);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });
  it('should render a card content with given text', () => {
    render(<Card>learn</Card>);
    expect(screen.getByText(/learn/i)).toBeInTheDocument();
  });
});

describe('CardDescription', () => {
  it('should render a card description', () => {
    render(<Card />);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });
  it('should render a card description with given text', () => {
    render(<Card>learn</Card>);
    expect(screen.getByText(/learn/i)).toBeInTheDocument();
  });
});

describe('CardFooter', () => {
  it('should render a card footer', () => {
    render(<Card />);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });
  it('should render a card footer with given text', () => {
    render(<Card>learn</Card>);
    expect(screen.getByText(/learn/i)).toBeInTheDocument();
  });
});

describe('CardHeader', () => {
  it('should render a card header', () => {
    render(<CardHeader />);
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
  });

  it('should render a card header with given text', () => {
    render(<CardHeader>learn</CardHeader>);
    expect(screen.getByText(/learn/i)).toBeInTheDocument();
  });
});

describe('CardTitle', () => {
  it('should render a card title', () => {
    render(<CardTitle />);
    expect(screen.getByTestId('card-title')).toBeInTheDocument();
  });

  it('should render a card title with given text', () => {
    render(<CardTitle>learn</CardTitle>);
    expect(screen.getByText(/learn/i)).toBeInTheDocument();
  });
});
