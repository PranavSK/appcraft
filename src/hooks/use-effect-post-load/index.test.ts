import { renderHook } from '@testing-library/react';

import { useEffectPostLoad } from './index';

describe('useEffectPostLoad', () => {
  it('should call the effect after the first render', () => {
    const effect = vi.fn();
    const { rerender } = renderHook(() => useEffectPostLoad(effect));
    expect(effect).not.toHaveBeenCalled();
    rerender();
    expect(effect).toHaveBeenCalledTimes(1);
  });
});

describe('useLayoutEffectPostLoad', () => {
  it('should call the effect after the first render', () => {
    const effect = vi.fn();
    const { rerender } = renderHook(() => useEffectPostLoad(effect));
    expect(effect).not.toHaveBeenCalled();
    rerender();
    expect(effect).toHaveBeenCalledTimes(1);
  });
});
