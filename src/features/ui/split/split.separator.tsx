import { GripHorizontal, GripVertical } from 'lucide-react';
import { forwardRef, type HTMLAttributes, type PointerEventHandler, useState } from 'react';

import { cn } from '#/lib/utils';

import { useSplitContext } from './split.context';
import { splitSeparatorHandleVariants, splitSeparatorVariants } from './split.variants';

export const SplitSeparator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { split, setSplit, orientation, containerSize } = useSplitContext();
    const [initialSplit, setInitialSplit] = useState(split);
    const [startPointerDragPosition, setStartPointerDragPosition] = useState(0);
    const HandleIcon = orientation === 'horizontal' ? GripVertical : GripHorizontal;

    const handlePointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      setStartPointerDragPosition(orientation === 'horizontal' ? event.clientX : event.clientY);
      setInitialSplit(split);
    };

    const handlePointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        const delta =
          orientation === 'horizontal'
            ? event.clientX - startPointerDragPosition
            : event.clientY - startPointerDragPosition;
        const newSplit = initialSplit + (delta / containerSize) * 100;
        setSplit(Math.max(0, Math.min(100, newSplit)));
      }
    };

    const handlePointerUp: PointerEventHandler<HTMLDivElement> = (event) => {
      event.currentTarget.releasePointerCapture(event.pointerId);
    };

    const handlePointerCancel: PointerEventHandler<HTMLDivElement> = (event) => {
      event.currentTarget.releasePointerCapture(event.pointerId);
    };

    return (
      <div
        className={cn(className, splitSeparatorVariants({ orientation }))}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        ref={ref}
        {...props}
      >
        <HandleIcon className={splitSeparatorHandleVariants({ orientation })} />
      </div>
    );
  },
);
SplitSeparator.displayName = 'SplitSeparator';
