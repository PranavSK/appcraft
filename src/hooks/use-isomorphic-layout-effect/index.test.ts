import { renderHook } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';

import { useIsomorphicLayoutEffect } from './index';

describe('useIsomorphicLayoutEffect', () => {
  const callback = vitest.fn();
  const { result } = renderHook(() => useIsomorphicLayoutEffect(callback));

  it('should return undefined.', () => {
    expect(result.current).toBeUndefined();
  });
});
