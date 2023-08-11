import type { Root } from '@radix-ui/react-slider';
import type { ComponentPropsWithoutRef } from 'react';

import type { sizeOpts } from './slider.variants';

export interface MarkProps extends Pick<SliderProps, 'max' | 'min' | 'step' | 'orientation'> {
  currentProgress?: number;
  start: 'left' | 'right' | 'top' | 'bottom';
  getOffset: (progress: number) => number;
  transformType: 'translateX' | 'translateY';
  isNegativeTransform: boolean;
}

export interface SliderProps
  extends Omit<
    ComponentPropsWithoutRef<typeof Root>,
    'defaultValue' | 'value' | 'onValueChange' | 'onValueCommit'
  > {
  showFill?: boolean;
  size: (typeof sizeOpts)[number];
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  onValueCommit?: (value: number) => void;
}
