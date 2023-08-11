import { useEffect, useRef } from 'react';
import { noop } from 'remeda';

export type IProps = Record<string, unknown>;

export const useLogUpdates = import.meta.env.DEV
  ? (componentName: string, props: IProps) => {
      const prevProps = useRef<IProps>({});

      useEffect(() => {
        if (prevProps.current) {
          const allKeys = Object.keys({ ...prevProps.current, ...props });
          const changedProps: IProps = {};

          allKeys.forEach((key) => {
            if (!Object.is(prevProps.current[key], props[key])) {
              changedProps[key] = {
                from: prevProps.current[key],
                to: props[key],
              };
            }
          });

          if (Object.keys(changedProps).length) {
            // eslint-disable-next-line no-console
            console.log('[why-did-you-update]', componentName, changedProps);
          }
        }

        prevProps.current = props;
      });
    }
  : noop;
