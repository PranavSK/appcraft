import { RefCallback, useCallback, useState } from 'react';

import { useResizeObserver } from '#/hooks/use-resize-observer';

export function useElementSize<T extends HTMLElement>() {
  const [width, setWidth] = useState<number | undefined>();
  const [height, setHeight] = useState<number | undefined>();

  const { ref: observerRef } = useResizeObserver((entry) => {
    const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];
    setWidth(Math.round(width));
    setHeight(Math.round(height));
  });

  const ref: RefCallback<T> = useCallback(
    (element) => {
      if (element == null) return;
      const { width, height } = element.getBoundingClientRect();
      setWidth(Math.round(width));
      setHeight(Math.round(height));
      observerRef(element);
    },
    [observerRef],
  );

  return { ref, width, height };
}
