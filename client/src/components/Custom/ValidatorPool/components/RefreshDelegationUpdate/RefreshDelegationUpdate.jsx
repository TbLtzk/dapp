import React, { useCallback, useEffect, useState } from 'react';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import Button from 'components/Base/Buttons/Button';
import ValidationRewardPools from 'contracts/src/ValidationRewardPools';
import QPiggyBank from 'contracts/src/QPiggyBank';

import { BlockAlignBlock } from 'pages/UserPages/Start/TabsAuth/MainTabs/Dashboard/styles';
import { Col } from 'react-bootstrap';
import { remainDateTimeSince } from 'func/convertDate';
import { useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';

export default function RefreshDelegationUpdate() {
  const userAddress = useSelector(userAddressMetamask);

  const [loading, setLoading] = useState(false);
  const [timeDelegationUnixTimestamp, setDelegationUnixTimestamp] = useState('0');
  const [timeDelegationUpdate, setTimeDelegationUpdate] = useState('0');

  const title = 'Time since last refresh of user delegations';

  async function getTimeDelegationUpdate (setTimeDelegationUpdate, setDelegationUnixTimestamp) {
    const contractValidationRewardPools = new ValidationRewardPools()
    const time = await contractValidationRewardPools.getLastUpdateOfCompoundRate(userAddress, userAddress)
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
    const contractQPiggyBank = new QPiggyBank(contractsToAddresses['QPiggyBank']);
    contractQPiggyBank.updateValidatorsCompoundRate(userAddress, userAddress)
      .then(
        res => {
          getTimeDelegationUpdate(setTimeDelegationUpdate, setDelegationUnixTimestamp);
          setLoading(false);
        }
      )
      .catch(e => {
        console.error(e)
        setTimeDelegationUpdate(0);
        setLoading(false);
      });
  }, []);

  return (
    <Col md={12} className="d-flex align-items-stretch">
      <BlockAlignBlock>
        <div>
          <p>{title}</p>
          <p>{timeDelegationUpdate}</p>
        </div>

        <div>
          <Button
            disabled={loading}
            title={loading ? <LoadingSpinner/> : 'Refresh'}
            width="100%"
            handleButton={btnHandler}
          />
        </div>
      </BlockAlignBlock>
    </Col>
  );
}
