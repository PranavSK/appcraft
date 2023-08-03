import { cva } from 'class-variance-authority';

export const orientationOpts = ['horizontal', 'vertical'] as const;
export const sizeOpts = ['sm', 'lg'] as const;

export const rootVariants = cva('relative flex touch-none select-none items-center', {
  variants: {
    orientation: {
      horizontal: 'w-full flex-row',
      vertical: 'h-full min-h-[5rem] flex-col',
    },
    size: { sm: '', lg: '' },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'sm',
  },
});

export const trackVariants = cva(['relative z-0 grow bg-secondary'], {
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full',
    },
    size: {
      sm: 'rounded-full',
      lg: '',
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      size: 'sm',
      className: 'h-1',
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      className: [
        'h-4 before:h-4 before:w-2 after:h-4 after:w-2',
        'before:absolute before:right-full before:rounded-l-full before:bg-inherit',
        'after:absolute after:left-full after:rounded-r-full after:bg-inherit',
      ],
    },
    {
      orientation: 'vertical',
      size: 'sm',
      className: 'w-1',
    },
    {
      orientation: 'vertical',
      size: 'lg',
      className: [
        'w-4 before:h-2 before:w-4 after:h-2 after:w-4',
        'before:absolute before:bottom-full before:rounded-t-full before:bg-inherit',
        'after:absolute after:top-full after:rounded-b-full after:bg-inherit',
      ],
    },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    size: 'sm',
  },
});

export const rangeVariants = cva('absolute rounded-full bg-primary', {
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

export const thumbVariants = cva(
  [
    'block rounded-full ring-offset-background transition-colors',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-4 bg-primary',
        lg: 'h-10 w-10 border-[0.5rem] border-primary bg-background',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

export const markVariants = cva('absolute z-10 rounded-full bg-primary/60', {
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
