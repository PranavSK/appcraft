import { useEffect, useState } from 'react';
import { find, pipe, sort } from 'remeda';

import { type Breakpoint, breakpoints as defaultBreakpoints } from '#/lib/breakpoint';
import { isBrowser } from '#/lib/browser';

export function useResponsive(
  breakpoints: Record<Exclude<Breakpoint, 'DEFAULT'>, number> = defaultBreakpoints,
) {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('DEFAULT');

  useEffect(() => {
    if (!isBrowser) return;
    const handleResize = () => {
      const width = window.innerWidth;
      // find the greatest breakpoint that is greater than or equal to the window width
      const breakpoint = pipe(
        Object.entries(breakpoints) as [Breakpoint, number][],
        sort.strict((a, b) => b[1] - a[1]),
        find(([_, breakpointWidth]) => width >= breakpointWidth),
      );
      setBreakpoint(breakpoint != null ? breakpoint[0] : 'DEFAULT');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints]);

  return breakpoint;
}
