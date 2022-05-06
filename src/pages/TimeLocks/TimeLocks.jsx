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

  const [currentAddress, setCurrentAddress] = useState({ address: userAddress });

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
    dispatch(getUserBalance(currentAddress.address));
    dispatch(getMinimumQVaultTimeLock(currentAddress.address));
    dispatch(getQVaultTimeLocks(currentAddress.address));

    dispatch(getRootNodeStakes(currentAddress.address));
    dispatch(getMinimumRootTimeLock(currentAddress.address));
    dispatch(getRootTimeLocks(currentAddress.address));

    dispatch(getSelfStake(currentAddress.address));
    dispatch(getMinimumValidatorsTimeLock(currentAddress.address));
    dispatch(getValidatorsTimeLocks(currentAddress.address));

    dispatch(getVestingBalance(currentAddress.address));
    dispatch(getMinimumVestingTimeLock(currentAddress.address));
    dispatch(getVestingTimeLocks(currentAddress.address));
  }, [dispatch, currentAddress]);

  const handleRefresh = (userAddress) => {
    setCurrentAddress(userAddress);
  };

  const cardsData = [
    {
      contract: 'qVault',
      timeLockBalance: fN(qVaultTimeLockMinimumBalance),
      balance: fN(qVaultStakeBalance),
      lockAmountData: qVaultTimeLocksArray || [],
      modalTitle: 'Deposit & purge',
      title: 'Q Vault Account Balance'
    },
    {
      contract: 'root',
      timeLockBalance: fN(rootTimeLockMinimumBalance),
      balance: fN(rootStakeBalance),
      lockAmountData: rootTimeLocksArray || [],
      modalTitle: 'Deposit & purge',
      title: 'Root Stake Balance'
    },
    {
      contract: 'validators',
      timeLockBalance: fN(validatorsTimeLockMinimumBalance),
      balance: fN(validatorSelfStake),
      lockAmountData: validatorsTimeLocksArray || [],
      modalTitle: 'Deposit & Purge',
      title: 'Validator Stake Balance'
    },
    {
      contract: 'vesting',
      timeLockBalance: fN(vestingTimeLockMinimumBalance),
      balance: fN(vestingStakeBalance),
      lockAmountData: vestingTimeLocksArray || [],
      modalTitle: 'Deposit, Withdraw & Purge',
      title: 'Vesting Account Balance'
    }
  ];

  return (
    <PageWrap headerTitle="Time Locks">
      <AddressForm setAddressRefresh={handleRefresh} userAddress={currentAddress} />
      <div className="content__colm-2 content__time-locks">
        {cardsData.map((card) => (
          <BalanceCard
            key={card.contract}
            address={currentAddress.address}
            {...card}
          />
        ))}
      </div>
    </PageWrap>
  );
}

export default TimeLocks;
