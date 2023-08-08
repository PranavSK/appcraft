import { type FC } from 'react';
import { filter, map, pipe } from 'remeda';

import { approxeq, getProgress } from '#/lib/math';
import { cn } from '#/lib/utils';

import type { MarkProps, SliderProps } from './slider.types';
import { markVariants } from './slider.variants';

const DefaultMark: FC<MarkProps> = ({
  mark,
  size,
  orientation,
  start,
  offset,
  transformType,
  isNegativeTransform,
}) => {
  return (
    <div
      key={mark}
      className={cn(size === 'lg' && markVariants({ orientation }))}
      style={{
        [start]: `calc(${mark}% + ${offset}px)`,
        transform: `${transformType}(${isNegativeTransform ? '-' : ''}50%)`,
      }}
    />
  );
};

function getThumbOffset(width: number, position: number, direction: number) {
  // Width of the thumb by max range - 100%
  const ratio = width / 100;
  const offset = position * ratio;
  return (width / 2 - offset * direction) * direction;
}

export const Marks = (
  props: Pick<
    SliderProps,
    'orientation' | 'inverted' | 'dir' | 'min' | 'max' | 'marks' | 'markRenderer'
  > & {
    thumbSize?: number;
    currentValue?: number;
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
  const { max = 100, min = 0 } = props;
  const currentMark = getProgress(props.currentValue ?? 0, min, max) * 100;
  const Mark = props.markRenderer ?? DefaultMark;
  const marks = pipe(
    props.marks ?? [],
    filter((mark) => mark >= min && mark <= max),
    map((mark) => getProgress(mark, min, max) * 100),
    map((mark) => (
      <Mark
        key={mark}
        {...{
          ...props,
          isCurrent: props.currentValue != null && approxeq(mark, currentMark),
          mark,
          start,
          offset: getThumbOffset(props.thumbSize ?? 0, mark, 1),
          transformType,
          isNegativeTransform,
        }}
      />
    )),
  );
  return <>{marks}</>;
};
