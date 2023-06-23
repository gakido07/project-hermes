import { useRef } from 'react';

interface params {
  timeout: number;
  fn: Function;
}

export function useDebounceRef({ timeout, fn }: params) {
  const debounceTimeoutRef = useRef<NodeJS.Timeout>(null);
  const execute = () => {
    if (!debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => fn(), timeout);
  };
  return { execute };
}
