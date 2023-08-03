import { HTMLAttributes } from 'react';

export interface SplitProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Set the orientation of the split panes.x
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The initial size of the left/top pane in percentage.
   */
  defaultSplit?: number;
  /**
   * The controlled size of the left/top pane in percentage.
   */
  split?: number;
  /**
   * The preferred minimum width/height of the left/top pane.
   * Specified as a CSS unit (e.g. %, fr, px).
   * The default is 0.
   */
  minPrimarySize?: string;
  /**
   * The preferred minimum width/height of the right/bottom pane.
   * Specified as a CSS unit (e.g. %, fr, px).
   * The default is 0.
   */
  minSecondarySize?: string;
  /**
   * The width of the splitter between the panes.
   * Specified as a CSS unit (e.g. %, fr, px).
   * The default is 7px.
   */
  separatorSize?: string;
  /**
   * Callback fired when the split changes.
   * @param {number} split The new split value.
   */
  onSplitChange?: (split: number) => void;
}
