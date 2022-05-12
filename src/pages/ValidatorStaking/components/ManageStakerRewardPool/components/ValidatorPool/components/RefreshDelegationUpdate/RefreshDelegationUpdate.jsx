import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import LoadingSpinner from 'components/Base/LoadingSpinner';

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

  const [timeDelegationUpdate, setTimeDelegationUpdate] = useState(0);

  useEffect(() => {
    setTimeDelegationUpdate(remainDateTimeSince(lastUpdateCompoundRate));
  }, [lastUpdateCompoundRate]);

  useInterval(() => {
    setTimeDelegationUpdate(remainDateTimeSince(lastUpdateCompoundRate));
  }, 30000);

  const btnHandler = () => {
    dispatch(setVRPUpdateValidatorsCompoundRate(userAddress));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <h5>Time Since Last Refresh of User Delegations</h5>
        <p>{timeDelegationUpdate || '0 day(s) 0 hours 0 minutes'}</p>
      </div>
      <div>
        <Button
          disabled={loadingUpdateCompoundRate}
          icon={loadingUpdateCompoundRate ? null : 'cached'}
          title={loadingUpdateCompoundRate
            ? <LoadingSpinner
              size="sm"
              className="m-1"
              type="light"
            />
            : null}
          iconFontSize="23px"
          onClick={btnHandler}
        />
      </div>
    </div>
  );
}

export default RefreshDelegationUpdate;
