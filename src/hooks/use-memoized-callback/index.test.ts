import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import { useMemoizedCallback } from './index';

const useCount = () => {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount((c) => c + 1);
  };

  const memoizedFn = useMemoizedCallback(() => count);

  return { addCount, memoizedFn };
};

describe('useMemoizedCallback', () => {
  it('should behave as input function', () => {
    const { result } = renderHook(() => useCount());
    expect(result.current.memoizedFn()).toBe(0);
    act(() => result.current.addCount());
    expect(result.current.memoizedFn()).toBe(1);
  });

  it('should maintain reference', () => {
    const { result } = renderHook(() => useCount());
    const initialFn = result.current.memoizedFn;
    act(() => result.current.addCount());
    expect(initialFn).toStrictEqual(result.current.memoizedFn);
  });
});
