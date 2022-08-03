import { useEffect, useRef } from 'react';

function useInterval (callback: () => void, delay: number, stop?: boolean) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (savedCallback.current && delay !== null) {
      if (!stop) {
        const id = setInterval(savedCallback.current, delay);
        return () => clearInterval(id);
      }
    }
  }, [delay, stop]);
}

export default useInterval;
