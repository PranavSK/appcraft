import { getProgress } from '#/lib/math';

import { SliderMarkContextProvider } from './slider.context';
import type { MarkProps, SliderProps } from './slider.types';

function getThumbOffset(width: number, position: number, direction: number) {
  // Width of the thumb by max range - 100%
  const ratio = width / 100;
  const offset = position * ratio;
  return (width / 2 - offset * direction) * direction;
}

export const Marks = (
  props: Pick<
    SliderProps,
    'orientation' | 'inverted' | 'dir' | 'min' | 'max' | 'step' | 'children'
  > & {
    currentValue?: number;
    thumbSize?: number;
  },
) => {
  const isSlidingFromBottom = !props.inverted;
  const isDirectionLTR = props.dir == null || props.dir === 'ltr';
  const isSlidingFromLeft =
    (isDirectionLTR && !props.inverted) || (!isDirectionLTR && props.inverted);
  let start: MarkProps['start'];
  let transformType: MarkProps['transformType'];
  let isNegativeTransform: boolean;
  if (props.orientation === 'vertical') {
    transformType = 'translateY';
    if (isSlidingFromBottom) {
      start = 'bottom';
      isNegativeTransform = false;
    } else {
      start = 'top';
      isNegativeTransform = true;
    }
  } else {
    transformType = 'translateX';
    if (isSlidingFromLeft) {
      start = 'left';
      isNegativeTransform = true;
    } else {
      start = 'right';
      isNegativeTransform = false;
    }
  }
  const { max = 100, min = 0, step, orientation, currentValue } = props;
  const currentMark = getProgress(currentValue ?? 0, min, max) * 100;
  const getOffset = (mark: number) => {
    return getThumbOffset(props.thumbSize ?? 0, mark, 1);
  };

  return (
    <SliderMarkContextProvider
      value={{
        max,
        min,
        step,
        currentProgress: currentMark,
        orientation,
        start,
        getOffset,
        transformType,
        isNegativeTransform,
      }}
    >
      {props.children}
    </SliderMarkContextProvider>
  );
};
