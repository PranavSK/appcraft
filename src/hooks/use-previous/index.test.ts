import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { Comparator } from './index';
import { usePrevious } from './index';

interface RenderHookProps<T> {
  state: T;
  comparator?: Comparator<T>;
}

interface CustomObject {
  label: string;
  value: string;
}

describe('usePrevious', () => {
  function getHookState<T>(initialValue: T, comparator?: Comparator<T>) {
    return renderHook<T | undefined, RenderHookProps<T>>(
      ({ state, comparator }) => usePrevious(state, comparator),
      {
        initialProps: { state: initialValue, comparator },
      },
    );
  }

  it('should return undefined on init', () => {
    expect(getHookState(undefined).result.current).toBeUndefined();
  });

  it('should work fine with `undefined` values', () => {
    const hook = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: undefined as undefined | number },
    });

    expect(hook.result.current).toBeUndefined();

    hook.rerender({ value: 1 });
    expect(hook.result.current).toBeUndefined();

    hook.rerender({ value: undefined });
    expect(hook.result.current).toBe(1);

    hook.rerender({ value: 2 });
    expect(hook.result.current).toBeUndefined();
  });

  describe('given default comparator', () => {
    it('should update previous value only after render with different value', () => {
      const hook = getHookState(0);
      expect(hook.result.current).toBeUndefined();

      hook.rerender({ state: 1 });
      expect(hook.result.current).toBe(0);

      hook.rerender({ state: 2 });
      expect(hook.result.current).toBe(1);

      hook.rerender({ state: 3 });
      expect(hook.result.current).toBe(2);

      hook.rerender({ state: 4 });
      expect(hook.result.current).toBe(3);

      hook.rerender({ state: 5 });
      expect(hook.result.current).toBe(4);
    });

    it('should not update previous value if current value is the same', () => {
      const hook = getHookState(0);
      expect(hook.result.current).toBeUndefined();

      hook.rerender({ state: 1 });
      expect(hook.result.current).toBe(0);

      hook.rerender({ state: 1 });
      expect(hook.result.current).toBe(0);
    });
  });

  describe('given custom comparator', () => {
    const obj1 = { label: 'John', value: 'john' };
    const obj2 = { label: 'Jonny', value: 'john' };
    const obj3 = { label: 'Kate', value: 'kate' };

    const comparator = (a: CustomObject | undefined, b: CustomObject) =>
      a ? a.value !== b.value : true;

    it('should update previous value only after render with different value', () => {
      const hook = getHookState(obj1, comparator);
      expect(hook.result.current).toBeUndefined();

      hook.rerender({ state: obj3, comparator });
      expect(hook.result.current).toBe(obj1);
    });

    it('should not update previous value if current value is the same', () => {
      const hook = getHookState(obj1, comparator);
      expect(hook.result.current).toBeUndefined();

      hook.rerender({ state: obj2, comparator });
      expect(hook.result.current).toBeUndefined();
    });
  });
});
