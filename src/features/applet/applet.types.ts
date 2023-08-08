import type { Breakpoint, WithResponsive } from '#/lib/breakpoint';

interface NodeData {
  id: string;
  type: string;
  groups: string[];
  children: string[];
  initialState: unknown;
}
export type AppletState = WithResponsive<Array<NodeData>>;

export interface AppletProps {
  initialState?: AppletState;
  overrideBreakpoint?: Breakpoint;
}
