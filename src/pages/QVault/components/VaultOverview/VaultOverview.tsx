import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';
import useVoteDelegation from 'hooks/useVoteDelegation';
import useVoterStatus from 'hooks/useVoterStatus';

import {
  getAccountBalance,
  getLockedAssets,
  getMinimumQVaultTimeLock,
  getQVBalance,
  getUserBalance,
} from 'store/q-vault/action-creators';
import {
  accountBalance,
  lastClaim,
  qVaultMinimumTimeLock,
  qvBalance,
  receivedWeight,
  userBalance,
  votingLockingEnd,
  votingWeight,
} from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { formatDateGMT, unixToDate } from 'utils/date';

function VaultOverview () {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userAddress = useSelector(userAddressMetamask);
  const voterStatus = useVoterStatus();

  const userQVBalance = useSelector(userBalance);
  const userQVBalanceRef = useAnimateNumber(userQVBalance);

  const qVaultLockedAmount = Number(useSelector(qVaultMinimumTimeLock));
  const qVaultLockedAmountRef = useAnimateNumber(qVaultLockedAmount);

  const balanceDetails = useSelector(qvBalance);
  const interestRatePercentageRef = useAnimateNumber(balanceDetails?.interestRatePercentage, ' %');
  const yearlyExpectedEarningsRef = useAnimateNumber(balanceDetails?.yearlyExpectedEarnings);

  const userAccountBalance = useSelector(accountBalance);
  const userAccountBalanceRef = useAnimateNumber(userAccountBalance);

  const userVotingWeight = useSelector(votingWeight);
  const userVotingWeightRef = useAnimateNumber(userVotingWeight);

  const userLockingEnd = formatDateGMT(unixToDate(useSelector(votingLockingEnd)));
  const updateOnClaim = useSelector(lastClaim);
  const weight = useSelector(receivedWeight);

  const { votingInfo } = useVoteDelegation(weight);

  useEffect(() => {
    dispatch(getAccountBalance(userAddress));
    dispatch(getUserBalance(userAddress));
    dispatch(getLockedAssets(userAddress));
    dispatch(getMinimumQVaultTimeLock(userAddress));
    dispatch(getQVBalance());
  }, [dispatch, updateOnClaim]);

  useInterval(() => {
    dispatch(getMinimumQVaultTimeLock(userAddress));
  }, 5000);

  return (
    <CustomBlock>
      <h1>{t('OVERVIEW')}</h1>
      <div>
        <h5>{t('Q_VAULT_BALANCE')}</h5>
        <p ref={userQVBalanceRef}>0 Q</p>

        <h5>{t('TIME_LOCKED_AMOUNT')}</h5>
        <p ref={qVaultLockedAmountRef}>0 Q</p>

        <h5>{t('Q_TOKEN_HOLDER_REWARD_RATE')}</h5>
        <p ref={interestRatePercentageRef}>0 %</p>

        <h5>{t('YEARLY_EXPECTED_REWARD')}</h5>
        <p ref={yearlyExpectedEarningsRef}> 0 Q</p>

        <h5>{t('Q_ADDRESS_BALANCE')}</h5>
        <p ref={userAccountBalanceRef}>0 Q</p>

        <div className="card__line" />

        <h5>{t('VOTING_WEIGHT_FROM_Q_VAULT')}</h5>
        <p ref={userVotingWeightRef}>0 Q</p>

        <h5>{t('VOTING_LOCKING_END')}</h5>
        <p>{userLockingEnd}</p>

        <h5>{t('VOTING_STATUS')}</h5>
        <p>{voterStatus}</p>

        <h5>{t('VOTE_DELEGATION')}</h5>
        <p className="card_text">{votingInfo}</p>
      </div>
    </CustomBlock>
  );
}

export default VaultOverview;
