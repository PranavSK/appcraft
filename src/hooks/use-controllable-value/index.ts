import { SetStateAction, useMemo, useRef } from 'react';
import { isFunction } from 'remeda';

import { useForceRender } from '#/hooks/use-force-render';
import { useMemoizedCallback } from '#/hooks/use-memoized-callback';

interface Props<T> {
  defaultValue: T;
  value?: T;
  onChange?: (value: T) => void;
}

export function useControllableValue<T>({
  defaultValue,
  value,
  onChange,
}: Props<T>): [T, (value: T | SetStateAction<T>) => void] {
  const isControlled = value != null;
  const initialValue = useMemo(() => {
    return value ?? defaultValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on mount
  }, []);

  const stateRef = useRef(initialValue);
  if (isControlled) {
    stateRef.current = value;
  }

  const rerender = useForceRender();

  const setValue = (v: T | SetStateAction<T>) => {
    const r = isFunction(v) ? v(stateRef.current) : v;

    if (!isControlled) {
      stateRef.current = r;
      rerender();
    }
    onChange?.(r);
  };

  return [stateRef.current, useMemoizedCallback(setValue)];
}
