import type { Meta, StoryObj } from '@storybook/react';
import { type FC } from 'react';
import { map, pipe, range } from 'remeda';

import { Slider } from './slider';
import { useSliderMarkContext } from './slider.context';
import { markVariants } from './slider.variants';

const DefaultMark: FC<{ mark: number }> = ({ mark }) => {
  const { orientation, start, getOffset, transformType, isNegativeTransform } =
    useSliderMarkContext();
  return (
    <div
      key={mark}
      className={markVariants({ orientation })}
      style={{
        [start]: `calc(${mark}% + ${getOffset(mark)}px)`,
        transform: `${transformType}(${isNegativeTransform ? '-' : ''}50%)`,
      }}
    />
  );
};

const meta: Meta<typeof Slider> = {
  component: Slider,
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    orientation: 'horizontal',
  },
} satisfies Story;

export const Vertical = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    orientation: 'vertical',
    showFill: true,
  },
} satisfies Story;

export const Large = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    orientation: 'horizontal',
    size: 'lg',
  },
} satisfies Story;

export const WithMarks = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    orientation: 'horizontal',
    size: 'lg',
    children: pipe(
      0,
      range(11),
      map((n) => n * 10),
      map((mark) => <DefaultMark key={mark} mark={mark} />),
    ),
  },
} satisfies Story;
