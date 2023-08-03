import { renderHook } from '@testing-library/react';
import { describe, expect, it, vitest } from 'vitest';

import { useOnUnmount } from './index';
describe('useOnUnmount', () => {
  it('should call the function on component unmount', async () => {
    const fn = vitest.fn();
    const hook = renderHook(() => useOnUnmount(fn));
    expect(fn).toBeCalledTimes(0);
    hook.rerender();
    expect(fn).toBeCalledTimes(0);
    hook.unmount();
    expect(fn).toBeCalledTimes(1);
  });
});
