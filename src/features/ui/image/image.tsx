import { forwardRef } from 'react';

import { cn } from '#/lib/utils';

import type { ImageProps } from './image.types';

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, alt, ...props }, ref) => {
    return (
      <img
        className={cn('inline h-[1.21em]', className)}
        src={src}
        alt={alt}
        ref={ref}
        {...props}
      />
    );
  },
);
Image.displayName = 'Image';
