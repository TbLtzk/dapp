import { useEffect, useRef } from 'react';

import { isNil } from 'lodash';

const useChangesListener = (value: null | string, handler: () => void) => {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!isNil(value)) {
      savedHandler.current();
    }
  }, [value]);
};

export default useChangesListener;
