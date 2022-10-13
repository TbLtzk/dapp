import { useMemo } from 'react';

import { TimeLockEntry } from '@q-dev/q-js-sdk';
import { getLockStatus } from 'helpers/time-locks';

import { TimeLockStatus } from 'constants/statuses';

const LOCKED_TIME_LOCKS_LIMIT = 10;

function useTimeLockLimits (timeLocks: TimeLockEntry[]) {
  const isLimitReached = useMemo(() => {
    const lockedTimeLocks = timeLocks.filter(lock => {
      const status = getLockStatus(lock);
      return status === TimeLockStatus.locked || status === TimeLockStatus.unlocking;
    });
    return lockedTimeLocks.length === LOCKED_TIME_LOCKS_LIMIT;
  }, [timeLocks]);

  return isLimitReached;
}

export default useTimeLockLimits;
