import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useResponsive } from './index';

describe('useResponsive', () => {
  function changeWidth(width: number) {
    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).innerWidth = width;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).dispatchEvent(new Event('resize'));
    });
  }

  const hook = renderHook(() => useResponsive());

  it('should give the default breakpoint keys on resize', () => {
    changeWidth(300);
    expect(hook.result.current).toEqual('DEFAULT');
    changeWidth(700);
    expect(hook.result.current).toEqual('sm');
    changeWidth(800);
    expect(hook.result.current).toEqual('md');
    changeWidth(1100);
    expect(hook.result.current).toEqual('lg');
    changeWidth(1300);
    expect(hook.result.current).toEqual('xl');
    changeWidth(1600);
    expect(hook.result.current).toEqual('2xl');
  });

  it('should give the custom breakpoint keys on resize', () => {
    const customBreakpoints = {
      sm: 400,
      md: 700,
      lg: 1000,
      xl: 1200,
      '2xl': 1400,
    };
    const hook = renderHook(() => useResponsive(customBreakpoints));
    changeWidth(300);
    expect(hook.result.current).toEqual('DEFAULT');
    changeWidth(500);
    expect(hook.result.current).toEqual('sm');
    changeWidth(800);
    expect(hook.result.current).toEqual('md');
    changeWidth(1100);
    expect(hook.result.current).toEqual('lg');
    changeWidth(1300);
    expect(hook.result.current).toEqual('xl');
    changeWidth(1600);
    expect(hook.result.current).toEqual('2xl');
  });
});
