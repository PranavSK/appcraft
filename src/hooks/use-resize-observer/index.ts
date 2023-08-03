import { ResizeObserver as Polyfill, ResizeObserverEntry } from '@juggle/resize-observer';
import { RefCallback, useCallback, useRef } from 'react';
import { noop } from 'remeda';

import { useIsomorphicLayoutEffect } from '#/hooks/use-isomorphic-layout-effect';
import { useMemoizedCallback } from '#/hooks/use-memoized-callback';
import { isBrowser } from '#/lib/browser';
const ResizeObserver =
  typeof window !== 'undefined' && 'ResizeObserver' in window ? window.ResizeObserver : Polyfill;

interface UseResizeObserverCallback {
  (entry: ResizeObserverEntry, observer: Polyfill): void;
}

export function useResizeObserver<T extends HTMLElement>(callback: UseResizeObserverCallback) {
  const resizeObserver = getResizeObserver();
  const storedCallback = useMemoizedCallback(callback);
  const target = useRef<T | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!isBrowser) return noop;
    let didUnsubscribe = false;
    const targetEl = target.current;
    if (!targetEl) return noop;

    function cb(entry: ResizeObserverEntry, observer: Polyfill) {
      if (didUnsubscribe) return;
      storedCallback(entry, observer);
    }

    resizeObserver.subscribe(targetEl, cb);

    return () => {
      didUnsubscribe = true;
      resizeObserver.unsubscribe(targetEl, cb);
    };
  }, [resizeObserver, storedCallback]);

  const ref: RefCallback<T> = useCallback((element) => {
    if (element == null) return;
    target.current = element;
  }, []);

  return { ref };
}

function createResizeObserver() {
  let ticking = false;
  let allEntries: ResizeObserverEntry[] = [];

  const callbacks: Map<Element, Array<UseResizeObserverCallback>> = new Map();

  const observer = new ResizeObserver((entries: ResizeObserverEntry[], obs: Polyfill) => {
    allEntries = allEntries.concat(entries);
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const triggered = new Set<Element>();
        for (let i = 0; i < allEntries.length; i++) {
          if (triggered.has(allEntries[i].target)) continue;
          triggered.add(allEntries[i].target);
          const cbs = callbacks.get(allEntries[i].target);
          cbs?.forEach((cb) => cb(allEntries[i], obs));
        }
        allEntries = [];
        ticking = false;
      });
    }
    ticking = true;
  });

  return {
    observer,
    subscribe(target: HTMLElement, callback: UseResizeObserverCallback) {
      observer.observe(target);
      const cbs = callbacks.get(target) ?? [];
      cbs.push(callback);
      callbacks.set(target, cbs);
    },
    unsubscribe(target: HTMLElement, callback: UseResizeObserverCallback) {
      const cbs = callbacks.get(target) ?? [];
      if (cbs.length === 1) {
        observer.unobserve(target);
        callbacks.delete(target);
        return;
      }
      const cbIndex = cbs.indexOf(callback);
      if (cbIndex !== -1) cbs.splice(cbIndex, 1);
      callbacks.set(target, cbs);
    },
  };
}

let _resizeObserver: ReturnType<typeof createResizeObserver>;

const getResizeObserver = () =>
  !_resizeObserver ? (_resizeObserver = createResizeObserver()) : _resizeObserver;
