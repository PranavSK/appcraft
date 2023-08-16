import { type CSSProperties, forwardRef } from 'react';
import { isFunction } from 'remeda';

import { useControllableValue } from '#/hooks/use-controllable-value';
import { useElementSize } from '#/hooks/use-element-size';

import { SplitContextProvider } from './split.context';
import type { SplitProps } from './split.types';
import { splitVariants } from './split.variants';

interface CustomStyle extends CSSProperties {
  '--split-min-primary': string;
  '--split-min-secondary': string;
  '--split-primary': string;
  '--split-separator': string;
}

function getCustomStyle(
  minPrimarySize: string,
  minSecondarySize: string,
  primarySize: string,
  separatorSize: string,
): CustomStyle {
  return {
    '--split-min-primary': minPrimarySize,
    '--split-min-secondary': minSecondarySize,
    '--split-primary': primarySize,
    '--split-separator': separatorSize,
  };
}

export const Split = forwardRef<HTMLDivElement, SplitProps>(
  (
    {
      className,
      orientation = 'horizontal',
      defaultSplit = 50,
      split: propsSplit,
      minPrimarySize = '0px',
      minSecondarySize = '0px',
      separatorSize = '0.5rem',
      onSplitChange,
      children,
      ...props
    },
    forwardedRef,
  ) => {
    const [split, setSplit] = useControllableValue({
      defaultValue: defaultSplit,
      value: propsSplit,
      onChange: onSplitChange,
    });
    const { ref: setSizeMeasureRef, width = 0, height = 0 } = useElementSize();

    return (
      <SplitContextProvider
        value={{
          split,
          setSplit,
          orientation,
          containerSize: orientation === 'horizontal' ? width : height,
        }}
      >
        <div
          data-testid="split"
          style={getCustomStyle(minPrimarySize, minSecondarySize, `${split}%`, separatorSize)}
          className={splitVariants({ orientation, className })}
          ref={(element) => {
            setSizeMeasureRef(element);
            if (forwardedRef) {
              if (isFunction(forwardedRef)) {
                forwardedRef(element);
              } else {
                forwardedRef.current = element;
              }
            }
          }}
          {...props}
        >
          {children}
        </div>
      </SplitContextProvider>
    );
  },
);
Split.displayName = 'Split';
