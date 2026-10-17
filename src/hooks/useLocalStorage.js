import { useState, useEffect, useCallback } from 'react';

/**
 * Resilient hook for syncing state with window.localStorage and cross-tab storage events.
 * @param {string} key Storage key
 * @param {*} initialValue Default value if key is not found in localStorage
 * @returns {[*, Function]} State and setter tuple
 */
export function useLocalStorage(key, initialValue) {
  // Read value safely from localStorage or use initialValue
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`[useLocalStorage] Error reading key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(readValue);

  // Return a wrapped version of useState's setter function that persists to localStorage
  const setValue = useCallback(
    (value) => {
      if (typeof window === 'undefined') {
        console.warn(`[useLocalStorage] window is undefined; cannot set "${key}"`);
        return;
      }

      try {
        setStoredValue((prev) => {
          const resolvedValue = value instanceof Function ? value(prev) : value;
          try {
            window.localStorage.setItem(key, JSON.stringify(resolvedValue));
            window.dispatchEvent(new Event('local-storage-sync'));
          } catch (storageError) {
            console.warn(`[useLocalStorage] Error writing key "${key}":`, storageError);
          }
          return resolvedValue;
        });
      } catch (error) {
        console.warn(`[useLocalStorage] Error setting key "${key}":`, error);
      }
    },
    [key]
  );

  // Sync across tabs via window 'storage' event and same-window custom event
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e?.key && e.key !== key) {
        return;
      }
      setStoredValue(readValue());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage-sync', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-sync', handleStorageChange);
    };
  }, [key, readValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;
