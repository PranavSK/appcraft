import { cleanup, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { useScript } from './index';

afterEach(cleanup);
describe('useScript', () => {
  it('should return "idle" status if src is undefined', () => {
    const { result } = renderHook(() => useScript(undefined));
    expect(result.current).toBe('idle');
  });

  it.todo('should ');
});
