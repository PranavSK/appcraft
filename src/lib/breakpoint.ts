import { keys } from 'remeda';

// Tailwind breakpoints:
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints | 'DEFAULT';

export type WithResponsive<T> = {
  DEFAULT: T;
} & {
  [key in Exclude<Breakpoint, 'DEFAULT'>]?: T;
};

const breakpointKeys = keys.strict(breakpoints);

export function mapToClosestBreakpoint(
  breakpoint: Breakpoint,
  availableBreakpoints: Breakpoint[] = ['DEFAULT'],
) {
  if (availableBreakpoints.length === 1 || breakpoint === 'DEFAULT') return 'DEFAULT';
  if (availableBreakpoints.includes(breakpoint)) return breakpoint;

  const breakpointIndex = breakpointKeys.indexOf(breakpoint);
  let closestBreakpointIndex = -1;
  for (const availableBreakpoint of availableBreakpoints) {
    if (availableBreakpoint === 'DEFAULT') continue;
    const availableBreakpointIndex = breakpointKeys.indexOf(availableBreakpoint);
    if (
      availableBreakpointIndex < breakpointIndex &&
      availableBreakpointIndex > closestBreakpointIndex
    ) {
      closestBreakpointIndex = availableBreakpointIndex;
    }
  }

  return breakpointKeys[closestBreakpointIndex] ?? 'DEFAULT';
}

export function compareBreakpoints(a: Breakpoint, b: Breakpoint) {
  if (a === b) return 0;
  if (a === 'DEFAULT') return -1;
  if (b === 'DEFAULT') return 1;
  return breakpointKeys.indexOf(a) - breakpointKeys.indexOf(b);
}
