import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardBlock from 'components/Base/CardBlock';
import LoadingSpinner from 'components/Base/LoadingSpinner';

import { userAddressMetamask } from 'store/user-inf/selectors';
import { setVRPUpdateValidatorsCompoundRate } from 'store/validation-reward-pools/action-creators';
import { lastUpdateOfCompoundRate, loadingUpdateOfCompoundRate } from 'store/validation-reward-pools/selectors';

import { remainDateTimeSince } from 'func/convertDate';

export default function RefreshDelegationUpdate () {
  const dispatch = useDispatch();

  const userAddress = useSelector(userAddressMetamask);
  const lastUpdateCompoundRate = useSelector(lastUpdateOfCompoundRate);
  const loadingUpdateCompoundRate = useSelector(loadingUpdateOfCompoundRate);
  const [timeDelegationUpdate, setTimeDelegationUpdate] = useState(0);
  const title = 'Time Since Last Refresh of User Delegations';

  useEffect(() => {
    setTimeDelegationUpdate(remainDateTimeSince(lastUpdateCompoundRate));
  }, [lastUpdateCompoundRate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDelegationUpdate(remainDateTimeSince(lastUpdateCompoundRate));
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [timeDelegationUpdate]);

  const btnHandler = () => {
    dispatch(setVRPUpdateValidatorsCompoundRate(userAddress));
  };

  return (
    <CardBlock
      title={title}
      firstContent={timeDelegationUpdate}
      btnTitle={loadingUpdateCompoundRate ? <LoadingSpinner /> : ''}
      btnHandler={btnHandler}
      btnDisabled={loadingUpdateCompoundRate}
      btnIcon={loadingUpdateCompoundRate ? '' : 'cached'}
      iconFontSize="20px"
    />
  );
}
