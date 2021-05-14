import React, { useCallback, useEffect, useState } from 'react';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import ValidationRewardPools from 'contracts/src/ValidationRewardPools';
import CardBlock from 'components/Base/CardBlock';

import { remainDateTimeSince } from 'func/convertDate';
import { useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';

import { contractRegistryInstance } from 'contracts/contracts';

export default function RefreshDelegationUpdate() {
  const userAddress = useSelector(userAddressMetamask);

  const [loading, setLoading] = useState(false);
  const [timeDelegationUnixTimestamp, setDelegationUnixTimestamp] = useState('0');
  const [timeDelegationUpdate, setTimeDelegationUpdate] = useState('0');

  const title = 'Time since last refresh of user delegations';

  async function getTimeDelegationUpdate(setTimeDelegationUpdate, setDelegationUnixTimestamp) {
    const contractValidationRewardPools = new ValidationRewardPools();
    const time = await contractValidationRewardPools.getLastUpdateOfCompoundRate(userAddress, userAddress);
    setDelegationUnixTimestamp(time);
    setTimeDelegationUpdate(remainDateTimeSince(time));
  }

  useEffect(() => {
    getTimeDelegationUpdate(setTimeDelegationUpdate, setDelegationUnixTimestamp);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDelegationUpdate(remainDateTimeSince(timeDelegationUnixTimestamp));
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [timeDelegationUnixTimestamp]);

  const btnHandler = useCallback(() => {
    setLoading(true);
    contractRegistryInstance.validationRewardPools()
      .then(
        validationRewardPools => {
          validationRewardPools.updateValidatorsCompoundRate(userAddress, { from: userAddress })
            .then(
              res => {
                getTimeDelegationUpdate(setTimeDelegationUpdate, setDelegationUnixTimestamp);
                setLoading(false);
              }
            )
            .catch(e => {
              console.error(e);
              setTimeDelegationUpdate(0);
              setLoading(false);
            });
        }
      );
  }, []);

  return (

    <CardBlock
      title={title}
      firstContent={timeDelegationUpdate}
      btnTitle={loading ? <LoadingSpinner/> : 'Refresh'}
      btnHandler={btnHandler}
      btnDisabled={loading}
    />
  );
}
