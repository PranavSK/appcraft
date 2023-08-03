import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useBoolean } from './index';

const setUp = (defaultValue?: boolean) => renderHook(() => useBoolean(defaultValue));

describe('useBoolean', () => {
  it('should be false when initialized', () => {
    const hooks = setUp();
    expect(hooks.result.current[0]).toBe(false);
  });

  it('should be true when setTrue is called', () => {
    const hooks = setUp(false);
    expect(hooks.result.current[0]).toBe(false);
    act(hooks.result.current[1].setTrue);
    expect(hooks.result.current[0]).toBe(true);
  });

  it('should be false when setFalse is called', () => {
    const hooks = setUp(true);
    expect(hooks.result.current[0]).toBe(true);
    act(hooks.result.current[1].setFalse);
    expect(hooks.result.current[0]).toBe(false);
  });

  it('should toggle value when toggle is called', () => {
    const hooks = setUp();
    expect(hooks.result.current[0]).toBe(false);
    act(hooks.result.current[1].toggle);
    expect(hooks.result.current[0]).toBe(true);
    act(hooks.result.current[1].toggle);
    expect(hooks.result.current[0]).toBe(false);
  });

  it('should set value when set is called', () => {
    const hooks = setUp();
    expect(hooks.result.current[0]).toBe(false);
    act(() => hooks.result.current[1].set(true));
    expect(hooks.result.current[0]).toBe(true);
    act(() => hooks.result.current[1].set(false));
    expect(hooks.result.current[0]).toBe(false);
  });

  it('should return same trigger function', () => {
    const hooks = setUp();
    const preUpdate = hooks.result.current[1];
    hooks.rerender();
    expect(hooks.result.current[1]).toEqual(preUpdate);
  });
});
