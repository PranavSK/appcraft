import { RefCallback, useCallback, useState } from 'react';
import { find, pipe, sort } from 'remeda';

import { useElementSize } from '#/hooks/use-element-size';
import { useIsomorphicLayoutEffect } from '#/hooks/use-isomorphic-layout-effect';
import { Breakpoint, breakpoints as defaultBreakpoints } from '#/lib/breakpoint';

export function useContainerResponsive<T extends Element>(
  breakpoints: Record<Exclude<Breakpoint, 'DEFAULT'>, number> = defaultBreakpoints,
) {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('DEFAULT');
  const { ref: parentRef, width } = useElementSize();

  const ref: RefCallback<T> = useCallback(
    (element) => {
      if (element == null) return;
      const container = element.parentElement;
      if (container == null) return;
      parentRef(container);
    },
    [parentRef],
  );

  useIsomorphicLayoutEffect(() => {
    if (width == null) return;
    // find the greatest breakpoint that is greater than or equal to the window width
    const breakpoint = pipe(
      Object.entries(breakpoints) as [Breakpoint, number][],
      sort.strict((a, b) => b[1] - a[1]),
      find(([_, breakpointWidth]) => width >= breakpointWidth),
    );
    setBreakpoint(breakpoint != null ? breakpoint[0] : 'DEFAULT');
  }, [breakpoints, width]);

  return { ref, breakpoint, containerWidth: width };
}
