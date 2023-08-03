import { cva } from 'class-variance-authority';

export const splitSeparatorVariants = cva(
  'flex touch-none items-center justify-center bg-secondary text-secondary-foreground hover:bg-secondary/80',
  {
    variants: {
      orientation: {
        horizontal: 'h-full w-split-separator cursor-ew-resize',
        vertical: 'h-split-separator w-full cursor-ns-resize',
      },
    },
  },
);

export const splitSeparatorHandleVariants = cva('', {
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full',
    },
  },
});

export const splitVariants = cva('grid', {
  variants: {
    orientation: {
      horizontal: 'grid-cols-split',
      vertical: 'grid-rows-split',
    },
  },
});
