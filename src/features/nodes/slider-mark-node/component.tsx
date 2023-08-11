import { cva } from 'class-variance-authority';
import { useAtomValue } from 'jotai';
import { type FC, ReactNode } from 'react';

import { useSliderMarkContext } from '#/features/ui/slider';
import { approxeq, getProgress, range } from '#/lib/math';
import { cn } from '#/lib/utils';

import { ChildrenNode } from '../common';
import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

const markVariants = cva('absolute z-10 rounded-full bg-[#646464]', {
  variants: {
    orientation: {
      horizontal: 'top-1 h-2 w-[0.125rem]',
      vertical: 'h-[0.125rem] w-full',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const markLabelVariants = cva('inline-block min-h-fit min-w-fit', {
  variants: {
    orientation: {
      horizontal: 'left-1/2 -translate-x-1/2 -translate-y-12',
      vertical: 'top-1/2 -translate-y-1/2 translate-x-10',
    },
    status: {
      active: 'font-extrabold',
      inactive: 'font-normal text-muted-foreground',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    status: 'active',
  },
});

const Mark: FC<{
  progress: number;
  showAllLabel: boolean;
  children: ReactNode;
  className?: string;
}> = ({ progress, showAllLabel, children, className }) => {
  const { currentProgress, orientation, start, getOffset, transformType, isNegativeTransform } =
    useSliderMarkContext();
  const isCurrent = approxeq(progress, currentProgress ?? 0);

  return (
    <span
      key={progress}
      className={cn(markVariants({ orientation }), className)}
      style={{
        [start]: `calc(${progress}% + ${getOffset(progress)}px)`,
        transform: `${transformType}(${isNegativeTransform ? '-' : ''}50%)`,
      }}
    >
      {(showAllLabel || isCurrent || approxeq(0, progress) || approxeq(100, progress)) && (
        <span
          className={cn(
            markLabelVariants({ orientation, status: isCurrent ? 'active' : 'inactive' }),
          )}
        >
          {children}
        </span>
      )}
    </span>
  );
};

export const Component: FC<NodeProps> = ({ id, className }) => {
  const { mode, position } = useAtomValue(nodeStateAtomFamily(id));
  const { max = 100, min = 0, step = 1 } = useSliderMarkContext();
  switch (mode) {
    case 'all': {
      const markValues = range(max, min, step);
      return markValues.map((val) => {
        const progress = getProgress(val, min, max) * 100;
        return (
          <Mark className={className} key={progress} progress={progress} showAllLabel={true}>
            {Math.round(val) !== val ? val.toFixed(1) : val.toString()}
          </Mark>
        );
      });
    }

    case 'active': {
      const markValues = range(max, min, step);
      return markValues.map((val) => {
        const progress = getProgress(val, min, max) * 100;
        return (
          <Mark className={className} key={progress} progress={progress} showAllLabel={false}>
            {Math.round(val) !== val ? val.toFixed(1) : val.toString()}
          </Mark>
        );
      });
    }
    case 'single': {
      return (
        <Mark className={className} key={position} progress={position} showAllLabel={true}>
          <ChildrenNode id={id} />
        </Mark>
      );
    }

    default:
      break;
  }
  return;
};
