import * as SliderPrimitive from '@radix-ui/react-slider';
import { type ElementRef, forwardRef, useCallback, useEffect, useState } from 'react';

import { useElementSize } from '#/hooks/use-element-size';

import type { SliderProps } from './slider.types';
import { Marks } from './slider.utils';
import { rangeVariants, rootVariants, thumbVariants, trackVariants } from './slider.variants';

export const Slider = forwardRef<ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, showFill, defaultValue, value, onValueChange, onValueCommit, ...props }, ref) => {
    const { ref: thumbRef, width: thumbSize } = useElementSize();

    const [localValue, setLocalValue] = useState<number | undefined>(defaultValue);

    const handleValueChange = useCallback(
      (value: number[]) => {
        if (onValueChange != null) {
          setLocalValue(value[0]);
          onValueChange(value[0]);
        }
      },
      [onValueChange],
    );

    const handleValueCommit = useCallback(
      (value: number[]) => {
        if (onValueCommit != null) {
          onValueCommit(value[0]);
        }
      },
      [onValueCommit],
    );

    useEffect(() => {
      if (value != null) {
        setLocalValue(value);
      }
    }, [value]);

    return (
      <SliderPrimitive.Root
        value={value != null ? [value] : undefined}
        defaultValue={defaultValue != null ? [defaultValue] : undefined}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
        ref={ref}
        className={rootVariants({ className, orientation: props.orientation, size: props.size })}
        {...props}
      >
        <SliderPrimitive.Track
          className={trackVariants({ orientation: props.orientation, size: props.size })}
        >
          {showFill && (
            <SliderPrimitive.Range className={rangeVariants({ orientation: props.orientation })} />
          )}
          <Marks thumbSize={thumbSize} currentValue={localValue} {...props} />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className={thumbVariants({ size: props.size })} ref={thumbRef} />
      </SliderPrimitive.Root>
    );
  },
);
Slider.displayName = SliderPrimitive.Root.displayName;
