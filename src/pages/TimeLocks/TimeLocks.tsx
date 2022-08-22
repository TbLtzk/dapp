import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import PageLayout from 'components/PageLayout';
import InfoTooltip from 'components/Tooltips/InfoTooltip';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import AddressForm from './components/AddressForm';
import BalanceCard from './components/BalanceCard';

import { getMinimumQVaultTimeLock, getQVaultTimeLocks, getUserBalance } from 'store/q-vault/action-creators';
import { qVaultMinimumTimeLock, qVaultTimeLocks, userBalance } from 'store/q-vault/selectors';
import { getMinimumRootTimeLock, getRootNodeStakes, getRootTimeLocks } from 'store/root-node/action-creators';
import { rootMinimumTimeLock, rootNodeStake, rootTimeLocks } from 'store/root-node/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';
import { getMinimumValidatorsTimeLock, getValidatorAccountableSelfStake, getValidatorsTimeLocks } from 'store/validators/action-creators';
import { validatorAccountableSelfStakeSelector, validatorsMinimumTimeLock, validatorsTimeLocks } from 'store/validators/selectors';
import { getMinimumVestingTimeLock, getVestingBalance, getVestingTimeLocks } from 'store/vesting/action-creators';
import { vestingBalance, vestingMinimumTimeLock, vestingTimeLocks } from 'store/vesting/selectors';

function TimeLocks () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const userAddress = useSelector(userAddressMetamask);

  const [currentAddress, setCurrentAddress] = useState(userAddress);

  const qVaultStakeBalanceRef = useAnimateNumber(useSelector(userBalance));
  const qVaultTimeLockMinimumBalanceRef = useAnimateNumber(useSelector(qVaultMinimumTimeLock));
  const qVaultTimeLocksArray = useSelector(qVaultTimeLocks);

  const rootStakeBalanceRef = useAnimateNumber(useSelector(rootNodeStake));
  const rootTimeLockMinimumBalanceRef = useAnimateNumber(useSelector(rootMinimumTimeLock));
  const rootTimeLocksArray = useSelector(rootTimeLocks);

  const validatorSelfStakeRef = useAnimateNumber(useSelector(validatorAccountableSelfStakeSelector));
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

    dispatch(getValidatorAccountableSelfStake(currentAddress));
    dispatch(getMinimumValidatorsTimeLock(currentAddress));
    dispatch(getValidatorsTimeLocks(currentAddress));

    dispatch(getVestingBalance(currentAddress));
    dispatch(getMinimumVestingTimeLock(currentAddress));
    dispatch(getVestingTimeLocks(currentAddress));
  }, [dispatch, currentAddress]);

  const cardsData = [
    {
      title: t('Q_VAULT_ACCOUNT_BALANCE'),
      contract: 'qVault',
      balanceRef: qVaultStakeBalanceRef,
      timeLockBalanceRef: qVaultTimeLockMinimumBalanceRef,
      lockAmountData: qVaultTimeLocksArray || [],
    },
    {
      title: t('ROOT_STAKE_BALANCE'),
      contract: 'root',
      balanceRef: rootStakeBalanceRef,
      timeLockBalanceRef: rootTimeLockMinimumBalanceRef,
      lockAmountData: rootTimeLocksArray || [],
    },
    {
      title: t('VALIDATOR_STAKE_BALANCE'),
      contract: 'validators',
      balanceRef: validatorSelfStakeRef,
      timeLockBalanceRef: validatorsTimeLockMinimumBalanceRef,
      lockAmountData: validatorsTimeLocksArray || [],
    },
    {
      title: t('VESTING_ACCOUNT_BALANCE'),
      contract: 'vesting',
      balanceRef: vestingStakeBalanceRef,
      timeLockBalanceRef: vestingTimeLockMinimumBalanceRef,
      lockAmountData: vestingTimeLocksArray || [],
    },
  ];

  return (
    <PageLayout
      title={t('TIME_LOCKS')}
      titleExtra={<InfoTooltip topic="time-locks" placement="bottom" />}
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
    </PageLayout>
  );
}

export default TimeLocks;
