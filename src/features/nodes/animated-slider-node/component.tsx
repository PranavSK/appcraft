import { Range, Root, Thumb, Track } from '@radix-ui/react-slider';
import { cva } from 'class-variance-authority';
import { useAtom } from 'jotai';
import { type FC, useCallback, useMemo } from 'react';

import { useAppletStoreBoundFunction } from '#/features/applet/applet.store';
import { Widget } from '#/features/ui/widget';
import { useInterval } from '#/hooks/use-interval';

import type { NodeProps } from '../node.types';
import { nodeStateAtomFamily } from './store';

const Play: FC = () => (
  <svg className="h-11 w-11" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="22" r="20" fill="#1A1A1A" />
    <path
      d="M27.2086 20.2936C28.4844 21.0735 28.4844 22.9265 27.2086 23.7064L20.2932 27.9339C18.9605 28.7486 17.25 27.7895 17.25 26.2275V17.7725C17.25 16.2105 18.9605 15.2514 20.2931 16.0661L27.2086 20.2936Z"
      fill="white"
    />
  </svg>
);

const Pause: FC = () => (
  <svg className="h-11 w-11" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="21.9997" cy="22.0002" r="20.1667" fill="#F6F6F6" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.3317 14.5028C18.3317 13.4902 17.5109 12.6694 16.4984 12.6694C15.4859 12.6694 14.665 13.4902 14.665 14.5028V29.5018C14.665 30.5143 15.4859 31.3351 16.4984 31.3351C17.5109 31.3351 18.3317 30.5143 18.3317 29.5018V14.5028ZM29.3317 14.5028C29.3317 13.4902 28.5109 12.6694 27.4984 12.6694C26.4859 12.6694 25.665 13.4902 25.665 14.5028V29.5018C25.665 30.5143 26.4859 31.3351 27.4984 31.3351C28.5109 31.3351 29.3317 30.5143 29.3317 29.5018V14.5028Z"
      fill="#1A1A1A"
    />
  </svg>
);

const Retry: FC = () => (
  <svg className="h-11 w-11" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="21.9997" cy="22.0002" r="20.1667" fill="#F6F6F6" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M29.2635 14.7458L25.4296 18.5797H35.0396V8.96973L31.0942 12.9151C29.0149 10.8536 26.2994 9.55501 23.3883 9.23098C20.4585 8.90487 17.505 9.58527 15.0132 11.1603C12.5214 12.7354 10.6397 15.1114 9.67732 17.8977C8.71495 20.6841 8.72924 23.7149 9.71783 26.4921C10.7064 29.2692 12.6105 31.6273 15.117 33.1789C17.6235 34.7304 20.5833 35.3829 23.5099 35.0292C26.4364 34.6755 29.1555 33.3366 31.2202 31.2326C33.2849 29.1286 34.5723 26.3847 34.8708 23.452L32.2951 23.1899C32.0562 25.5379 31.0254 27.7347 29.3724 29.4192C27.7193 31.1037 25.5423 32.1757 23.1992 32.4589C20.8561 32.7421 18.4864 32.2197 16.4796 30.9775C14.4728 29.7353 12.9484 27.8473 12.1569 25.6238C11.3654 23.4004 11.354 20.9738 12.1245 18.7429C12.8949 16.5121 14.4015 14.6098 16.3965 13.3488C18.3915 12.0877 20.7562 11.543 23.1019 11.8041C25.4289 12.0631 27.5998 13.0999 29.2635 14.7458Z"
      fill="#1A1A1A"
    />
  </svg>
);

const containerVariants = cva('flex items-center justify-center gap-5', {
  variants: {
    orientation: {
      vertical: 'flex-col px-2 py-5',
      horizontal: 'flex-row px-5 py-2',
    },
  },
});

const sliderRootVariants = cva('relative flex touch-none select-none items-center', {
  variants: {
    orientation: {
      horizontal: 'w-full flex-row',
      vertical: 'h-full min-h-[5rem] flex-col',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const sliderTrackVariants = cva(['relative z-0 grow bg-[#C7C7C7]'], {
  variants: {
    orientation: {
      horizontal: 'h-1 w-full',
      vertical: 'h-full w-1',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const sliderRangeVariants = cva('absolute rounded-full bg-[#1A1A1A]', {
  variants: {
    orientation: {
      horizontal: 'h-full',
      vertical: 'w-full',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export const Component: FC<NodeProps> = ({ id, className }) => {
  const [
    {
      value,
      state,
      min,
      max,
      step,
      interval,
      onValueChange,
      onStateChange,
      rowStart,
      rowEnd,
      columnStart,
      columnEnd,
    },
    setState,
  ] = useAtom(nodeStateAtomFamily(id));

  const orientation =
    Math.abs(rowEnd - rowStart) > Math.abs(columnEnd - columnStart) ? 'vertical' : 'horizontal';

  const onValueChangeImpl = useAppletStoreBoundFunction('value', onValueChange ?? '');
  const onStateChangeImpl = useAppletStoreBoundFunction('value', onStateChange ?? '');

  const handleValueChange = useCallback(
    ([value]: number[]) => {
      setState((prev) => {
        onValueChangeImpl(value);
        if (prev.state !== 'paused') onStateChangeImpl('paused');
        return { ...prev, value, state: 'paused' };
      });
    },
    [onStateChangeImpl, onValueChangeImpl, setState],
  );

  const handleClick = useCallback(() => {
    setState((prev) => {
      if (prev.state === 'playing') {
        onStateChangeImpl('paused');
        return { ...prev, state: 'paused' };
      } else {
        let value = prev.value;
        if (value >= max) {
          value = min;
          onValueChangeImpl(value);
        }
        onStateChangeImpl('playing');
        return { ...prev, value, state: 'playing' };
      }
    });
  }, [max, min, onStateChangeImpl, onValueChangeImpl, setState]);

  useInterval(
    () =>
      setState((prev) => {
        const newValue = prev.value + step;
        if (newValue >= max) {
          onValueChangeImpl(max);
          onStateChangeImpl('paused');
          return { ...prev, value: max, state: 'paused' };
        }
        onValueChangeImpl(newValue);
        return { ...prev, value: newValue };
      }),
    state === 'playing' ? interval : null,
  );

  const icon = useMemo(() => {
    if (state === 'playing') return <Pause />;
    if (state === 'paused' && value >= max) return <Retry />;
    return <Play />;
  }, [state, value, max]);

  return (
    <Widget
      {...{ rowStart, rowEnd, columnStart, columnEnd }}
      className={containerVariants({ className, orientation })}
    >
      <button
        className="rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none"
        onClick={handleClick}
      >
        {icon}
      </button>
      <Root
        value={[value]}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        step={step}
        orientation={orientation}
        className={sliderRootVariants({ orientation })}
      >
        <Track className={sliderTrackVariants({ orientation })}>
          <Range className={sliderRangeVariants({ orientation })} />
        </Track>
        <Thumb className="block h-4 w-4 rounded-full bg-[#1A1A1A] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      </Root>
    </Widget>
  );
};
