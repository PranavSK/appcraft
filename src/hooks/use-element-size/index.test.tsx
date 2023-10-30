import { act, render, screen } from '@testing-library/react';

import { useElementSize } from './index';

let callback: (arg0: { contentRect: { width: number; height: number } }[]) => void;
const mockResizeObserver = vi.fn((cb) => {
  callback = cb;
  return {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  };
});
vi.stubGlobal('ResizeObserver', mockResizeObserver);

const mockRaf = vi.fn((cb: FrameRequestCallback) => {
  cb(0);
  return 0;
});
vi.stubGlobal('requestAnimationFrame', mockRaf);

afterEach(() => {
  vi.resetAllMocks();
});

describe('useElementSize', () => {
  it('should return the size of the element', () => {
    const SampleDiv = () => {
      const { ref, width, height } = useElementSize();
      return <div data-testid="sample" ref={ref}>{`Size: ${width} x ${height}`}</div>;
    };

    render(<SampleDiv />);
    const sampleDiv = screen.getByTestId('sample');
    expect(sampleDiv).toHaveTextContent('Size: 0 x 0');

    act(() => callback([{ contentRect: { width: 100, height: 200 } }]));
    expect(sampleDiv).toHaveTextContent('Size: 100 x 200');
  });
});
