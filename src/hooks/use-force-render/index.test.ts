import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useMemoizedCallback } from '#/hooks/use-memoized-callback';

import { useForceRender } from './index';

describe('useForceRender', () => {
  it('should re-render', () => {
    let count = 0;
    const hooks = renderHook(() => {
      const update = useForceRender();
      return {
        update,
        count,
        onChange: useMemoizedCallback(() => {
          count++;
          update();
        }),
      };
    });

    expect(hooks.result.current.count).toBe(0);
    act(hooks.result.current.onChange);
    expect(hooks.result.current.count).toBe(1);
  });

  it('should return same trigger function', () => {
    const hooks = renderHook(() => useForceRender());
    const preUpdate = hooks.result.current;
    hooks.rerender();
    expect(hooks.result.current).toEqual(preUpdate);
  });
});
