import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageWrap from 'components/Base/PageWrap';
import InfoTooltip from 'components/Custom/InfoTooltip';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

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

function TimeLocks () {
  const dispatch = useDispatch();

  const userAddress = useSelector(userAddressMetamask);

  const [currentAddress, setCurrentAddress] = useState(userAddress);

  const qVaultStakeBalanceRef = useAnimateNumber(useSelector(userBalance));
  const qVaultTimeLockMinimumBalanceRef = useAnimateNumber(useSelector(qVaultMinimumTimeLock));
  const qVaultTimeLocksArray = useSelector(qVaultTimeLocks);

  const rootStakeBalanceRef = useAnimateNumber(useSelector(rootNodeStake));
  const rootTimeLockMinimumBalanceRef = useAnimateNumber(useSelector(rootMinimumTimeLock));
  const rootTimeLocksArray = useSelector(rootTimeLocks);

  const validatorSelfStakeRef = useAnimateNumber(useSelector(selfStake));
  const validatorsTimeLockMinimumBalanceRef = useAnimateNumber(useSelector(validatorsMinimumTimeLock));
  const validatorsTimeLocksArray = useSelector(validatorsTimeLocks);

  const vestingStakeBalanceRef = useAnimateNumber(useSelector(vestingBalance));
  const vestingTimeLockMinimumBalanceRef = useAnimateNumber(useSelector(vestingMinimumTimeLock));
  const vestingTimeLocksArray = useSelector(vestingTimeLocks);

  useInterval(() => {
    dispatch(getMinimumQVaultTimeLock(currentAddress));
    dispatch(getMinimumRootTimeLock(currentAddress));
    dispatch(getMinimumValidatorsTimeLock(currentAddress));
    dispatch(getMinimumVestingTimeLock(currentAddress));
  }, 5000);

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
      balanceRef: qVaultStakeBalanceRef,
      timeLockBalanceRef: qVaultTimeLockMinimumBalanceRef,
      lockAmountData: qVaultTimeLocksArray || [],
    },
    {
      title: 'Root Stake Balance',
      contract: 'root',
      balanceRef: rootStakeBalanceRef,
      timeLockBalanceRef: rootTimeLockMinimumBalanceRef,
      lockAmountData: rootTimeLocksArray || [],
    },
    {
      title: 'Validator Stake Balance',
      contract: 'validators',
      balanceRef: validatorSelfStakeRef,
      timeLockBalanceRef: validatorsTimeLockMinimumBalanceRef,
      lockAmountData: validatorsTimeLocksArray || [],
    },
    {
      title: 'Vesting Account Balance',
      contract: 'vesting',
      balanceRef: vestingStakeBalanceRef,
      timeLockBalanceRef: vestingTimeLockMinimumBalanceRef,
      lockAmountData: vestingTimeLocksArray || [],
    },
  ];

  return (
    <PageWrap
      pageHeader="Time Locks"
      pageTooltip={<InfoTooltip topic="time-locks" placement="bottom" />}
    >
      <AddressForm userAddress={currentAddress} onChange={setCurrentAddress} />
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
