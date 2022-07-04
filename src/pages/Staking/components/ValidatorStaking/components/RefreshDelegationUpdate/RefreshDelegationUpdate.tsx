import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';

import useInterval from 'hooks/useInterval';

import { userAddressMetamask } from 'store/user-inf/selectors';
import { setVRPUpdateValidatorsCompoundRate } from 'store/validation-reward-pools/action-creators';
import { lastUpdateOfCompoundRate, loadingUpdateOfCompoundRate } from 'store/validation-reward-pools/selectors';

import { remainDateTimeSince } from 'func/convertDate';

function RefreshDelegationUpdate () {
  const dispatch = useDispatch();

  const userAddress = useSelector(userAddressMetamask);
  const lastUpdateCompoundRate = useSelector(lastUpdateOfCompoundRate);
  const loadingUpdateCompoundRate = useSelector(loadingUpdateOfCompoundRate);

  const [timeDelegationUpdate, setTimeDelegationUpdate] = useState<string | number>(0);

  useEffect(() => {
    setTimeDelegationUpdate(remainDateTimeSince(lastUpdateCompoundRate));
  }, [lastUpdateCompoundRate]);

  useInterval(() => {
    setTimeDelegationUpdate(remainDateTimeSince(lastUpdateCompoundRate));
  }, 30000);

  const handleUpdateCompoundRate = () => {
    dispatch(setVRPUpdateValidatorsCompoundRate(userAddress));
  };

  return (
    <div className="refresh-delegation_container">
      <div>
        <p className="text-md">Time Since Last Refresh of User Delegations</p>
        <h4 className="text-xl">{timeDelegationUpdate || '0 day(s) 0 hours 0 minutes'}</h4>
      </div>

      <Button
        loading={loadingUpdateCompoundRate}
        disabled={loadingUpdateCompoundRate}
        onClick={handleUpdateCompoundRate}
      >
        Refresh
      </Button>
    </div>
  );
}

export default RefreshDelegationUpdate;
