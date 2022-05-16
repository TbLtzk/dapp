import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageWrap from 'components/Base/PageWrap';

import AddressForm from './components/AddressForm';
import BalanceCard from './components/BalanceCard';

import { getMinimumQVaultTimeLock, getQVaultTimeLocks, getUserBalance } from 'store/q-vault/action-creators';
import { qVaultMinimumTimeLock, qVaultTimeLocks, userBalance } from 'store/q-vault/selectors';
import { getMinimumRootTimeLock, getRootNodeStakes, getRootTimeLocks } from 'store/root-node/action-creators';
import { rootMinimumTimeLock, rootNodeStake, rootTimeLocks } from 'store/root-node/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';
import { getMinimumValidatorsTimeLock, getSelfStake, getValidatorsTimeLocks } from 'store/validators/action-creators';
import { selfStake, validatorsMinimumTimeLock, validatorsTimeLocks } from 'store/validators/selectors';
import { getMinimumVestingTimeLock, getVestingBalance, getVestingTimeLocks } from 'store/vesting/action-creators';
import { vestingBalance, vestingMinimumTimeLock, vestingTimeLocks } from 'store/vesting/selectors';

import { fN } from 'func/useful';

function TimeLocks () {
  const dispatch = useDispatch();

  const userAddress = useSelector(userAddressMetamask);

  const [currentAddress, setCurrentAddress] = useState(userAddress);

  const qVaultStakeBalance = useSelector(userBalance);
  const qVaultTimeLockMinimumBalance = useSelector(qVaultMinimumTimeLock);
  const qVaultTimeLocksArray = useSelector(qVaultTimeLocks);

  const rootStakeBalance = useSelector(rootNodeStake);
  const rootTimeLockMinimumBalance = useSelector(rootMinimumTimeLock);
  const rootTimeLocksArray = useSelector(rootTimeLocks);

  const validatorSelfStake = useSelector(selfStake);
  const validatorsTimeLockMinimumBalance = useSelector(validatorsMinimumTimeLock);
  const validatorsTimeLocksArray = useSelector(validatorsTimeLocks);

  const vestingStakeBalance = useSelector(vestingBalance);
  const vestingTimeLockMinimumBalance = useSelector(vestingMinimumTimeLock);
  const vestingTimeLocksArray = useSelector(vestingTimeLocks);

  useEffect(() => {
    dispatch(getUserBalance(currentAddress));
    dispatch(getMinimumQVaultTimeLock(currentAddress));
    dispatch(getQVaultTimeLocks(currentAddress));

    dispatch(getRootNodeStakes(currentAddress));
    dispatch(getMinimumRootTimeLock(currentAddress));
    dispatch(getRootTimeLocks(currentAddress));

    dispatch(getSelfStake(currentAddress));
    dispatch(getMinimumValidatorsTimeLock(currentAddress));
    dispatch(getValidatorsTimeLocks(currentAddress));

    dispatch(getVestingBalance(currentAddress));
    dispatch(getMinimumVestingTimeLock(currentAddress));
    dispatch(getVestingTimeLocks(currentAddress));
  }, [dispatch, currentAddress]);

  const cardsData = [
    {
      title: 'Q Vault Account Balance',
      contract: 'qVault',
      balance: fN(qVaultStakeBalance),
      timeLockBalance: fN(qVaultTimeLockMinimumBalance),
      lockAmountData: qVaultTimeLocksArray || [],
    },
    {
      title: 'Root Stake Balance',
      contract: 'root',
      balance: fN(rootStakeBalance),
      timeLockBalance: fN(rootTimeLockMinimumBalance),
      lockAmountData: rootTimeLocksArray || [],
    },
    {
      title: 'Validator Stake Balance',
      contract: 'validators',
      balance: fN(validatorSelfStake),
      timeLockBalance: fN(validatorsTimeLockMinimumBalance),
      lockAmountData: validatorsTimeLocksArray || [],
    },
    {
      title: 'Vesting Account Balance',
      contract: 'vesting',
      balance: fN(vestingStakeBalance),
      timeLockBalance: fN(vestingTimeLockMinimumBalance),
      lockAmountData: vestingTimeLocksArray || [],
    }
  ];

  return (
    <PageWrap headerTitle="Time Locks">
      <AddressForm
        userAddress={currentAddress}
        onChange={setCurrentAddress}
      />
      <div className="content__colm-2 content__time-locks">
        {cardsData.map((card) => (
          <BalanceCard
            key={card.contract}
            address={currentAddress}
            {...card}
          />
        ))}
      </div>
    </PageWrap>
  );
}

export default TimeLocks;
