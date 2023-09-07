import { useCallback, useEffect, useRef } from 'react';

export const useLazyTimeout = (cb: () => void, delay: number) => {
  const timeoutRef = useRef(0);
  const cbRef = useRef(() => {});

  cbRef.current = cb;

  const clearTimeout = useCallback(() => {
    window.clearTimeout(timeoutRef.current);
  }, []);

  const setTimeout = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => {
      cbRef.current();
    }, delay);
  }, [delay]);

  return { timeoutRef, setTimeout, clearTimeout };
};

export const useTimeout = (cb: () => void, delay: number) => {
  const { timeoutRef, clearTimeout, setTimeout } = useLazyTimeout(cb, delay);

  useEffect(() => {
    setTimeout();
    return clearTimeout;
  }, [setTimeout, clearTimeout]);

  return { timeoutRef, clearTimeout, setTimeout };
};
