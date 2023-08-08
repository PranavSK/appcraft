import * as SliderPrimitive from '@radix-ui/react-slider';
import { type ElementRef, forwardRef } from 'react';

import { useControllableValue } from '#/hooks/use-controllable-value';
import { useElementSize } from '#/hooks/use-element-size';

import type { SliderProps } from './slider.types';
import { Marks } from './slider.utils';
import { rangeVariants, rootVariants, thumbVariants, trackVariants } from './slider.variants';

export const Slider = forwardRef<ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  (
    {
      className,
      showFill,
      defaultValue,
      value,
      onValueChange,
      onValueCommit,
      markRenderer,
      ...props
    },
    ref,
  ) => {
    const { ref: thumbRef, width: thumbSize } = useElementSize();
    const [localValue, setLocalValue] = useControllableValue<number>({
      value,
      defaultValue: defaultValue ?? 0,
      onChange: onValueChange,
    });
    return (
      <SliderPrimitive.Root
        value={[localValue]}
        onValueChange={([value]) => setLocalValue(value)}
        onValueCommit={onValueCommit != null ? (values) => onValueCommit(values[0]) : undefined}
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
          <Marks
            thumbSize={thumbSize}
            currentValue={value}
            markRenderer={markRenderer}
            {...props}
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className={thumbVariants({ size: props.size })} ref={thumbRef} />
      </SliderPrimitive.Root>
    );
  },
);
Slider.displayName = SliderPrimitive.Root.displayName;
