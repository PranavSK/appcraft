import { createContext, useContext } from 'react';

import type { MarkProps } from './slider.types';

const SliderMarkContext = createContext<MarkProps | null>(null);
export const SliderMarkContextProvider = SliderMarkContext.Provider;
export function useSliderMarkContext() {
  const props = useContext(SliderMarkContext);
  if (!props) {
    throw new Error('SliderMarkContextProvider is missing from the component tree');
  }
  return props;
}
