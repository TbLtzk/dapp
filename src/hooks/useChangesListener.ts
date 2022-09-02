import { useEffect, useRef } from 'react';

const useChangesListener = (value: string, handler: () => void) => {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (value !== '') {
      savedHandler.current();
    }
  }, [value]);
};

export default useChangesListener;
