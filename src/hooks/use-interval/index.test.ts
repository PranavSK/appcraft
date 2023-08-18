import { renderHook } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';

import { useInterval } from './index';

describe('useInterval', () => {
  vitest.useFakeTimers();
  vitest.spyOn(global, 'clearInterval');

  it('should call the callback after the delay', () => {
    const callback = vitest.fn();
    renderHook(() => useInterval(callback, 1000));

    expect(callback).not.toHaveBeenCalled();
    vitest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    vitest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should not call the callback if the delay is null', () => {
    const callback = vitest.fn();
    renderHook(() => useInterval(callback, null));

    expect(callback).not.toHaveBeenCalled();
    vitest.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should not call the callback if the delay is undefined', () => {
    const callback = vitest.fn();
    renderHook(() => useInterval(callback));

    expect(callback).not.toHaveBeenCalled();
    vitest.advanceTimersByTime(1000);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should stop the interval when the delay is null', () => {
    const callback = vitest.fn();
    const { rerender } = renderHook<() => void, { delay?: number | null }>(
      (props) => useInterval(callback, props.delay),
      {
        initialProps: { delay: 1000 },
      },
    );

    expect(callback).not.toHaveBeenCalled();
    vitest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    rerender({ delay: null });
    vitest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should clear the interval when the component unmounts', () => {
    const callback = vitest.fn();
    const { unmount } = renderHook(() => useInterval(callback, 1000));

    expect(callback).not.toHaveBeenCalled();
    vitest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    unmount();
    vitest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should call the callback immediately if the immediate option is true', () => {
    const callback = vitest.fn();
    renderHook(() => useInterval(callback, 1000, { immediate: true }));

    expect(callback).toHaveBeenCalledTimes(1);
    vitest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should clear when the clear function is called', () => {
    const callback = vitest.fn();
    const { result } = renderHook(() => useInterval(callback, 1000));

    expect(callback).not.toHaveBeenCalled();
    vitest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);

    result.current();
    vitest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
