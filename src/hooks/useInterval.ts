import { useEffect, useRef } from 'react';

function useInterval (callback: () => void, delay: number, stop?: boolean) {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (savedCallback.current && delay !== null) {
      if (!stop) {
        const interval = setInterval(() => savedCallback.current(), delay);
        return () => clearInterval(interval);
      }
    }
  }, [delay, stop]);
}

export default useInterval;
