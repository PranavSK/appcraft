import { act, renderHook } from '@testing-library/react';

import { useContainerResponsive } from './index';

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

const changeContainerSize = (width: number, height: number) => {
  act(() => {
    callback([{ contentRect: { width, height } }]);
  });
};

describe('useContainerResponsive', () => {
  it('should return the default breakpoint when the container is resized', () => {
    const element = document.createElement('div');
    const container = document.createElement('div');
    container.appendChild(element);
    document.body.appendChild(container);
    const { result } = renderHook(() => useContainerResponsive());
    result.current.ref(element);
    changeContainerSize(300, 300);
    expect(result.current.breakpoint).toBe('DEFAULT');
    changeContainerSize(700, 300);
    expect(result.current.breakpoint).toBe('sm');
    changeContainerSize(800, 300);
    expect(result.current.breakpoint).toBe('md');
    changeContainerSize(1100, 300);
    expect(result.current.breakpoint).toBe('lg');
    changeContainerSize(1300, 300);
    expect(result.current.breakpoint).toBe('xl');
    changeContainerSize(1600, 300);
    expect(result.current.breakpoint).toBe('2xl');

    document.body.removeChild(container);
  });
});
