import { useRef } from 'react';

export type Comparator<T> = (prev: T | undefined, next: T) => boolean;

const defaultComparator = <T>(a?: T, b?: T) => !Object.is(a, b);

/**
 * A hook to track the previous state.
 * @param state The state that needs to be tracked.
 * @param comparator Custom callback to determine if the previous state value should be updated.
 * @returns The previous state value.
 */
export function usePrevious<T>(
  state: T,
  comparator: Comparator<T> = defaultComparator,
): T | undefined {
  const previousRef = useRef<T>();
  const currentRef = useRef<T>();

  if (comparator(currentRef.current, state)) {
    previousRef.current = currentRef.current;
    currentRef.current = state;
  }

  return previousRef.current;
}
