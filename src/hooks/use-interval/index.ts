import { useCallback, useEffect, useRef } from 'react';
import { isNumber } from 'remeda';

import { useMemoizedCallback } from '#/hooks/use-memoized-callback';

/**
 *
 * @param callback The function to be executed every {@link delay} milliseconds.
 * @param delay The time in milliseconds, the timer should delay in between executions of the specified function. The timer will be cancelled if {@link delay} is `null | undefined`.
 * @param options
 * @returns
 */
export function useInterval(
  callback: () => void,
  delay?: number | null,
  options: { immediate?: boolean } = {},
) {
  const timerCallback = useMemoizedCallback(callback);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!isNumber(delay) || delay < 0) return;
    if (options.immediate) timerCallback();
    timerRef.current = setInterval(timerCallback, delay);
    return clear;
  }, [clear, delay, options.immediate, timerCallback]);

  return clear;
}
