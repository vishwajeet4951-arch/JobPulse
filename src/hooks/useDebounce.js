import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce any fast-changing value.
 * @param {*} value The value to debounce
 * @param {number} delay Debounce delay in milliseconds (default 250ms for search)
 * @returns {*} Debounced value
 */
export function useDebounce(value, delay = 250) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
