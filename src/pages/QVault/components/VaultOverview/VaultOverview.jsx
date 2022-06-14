import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';
import VoterStatus from 'components/Custom/PageLists/VoterStatus';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

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
  votingAgent,
  votingLockingEnd,
  votingWeight,
} from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { getVoteDelegation } from 'contracts/helpers/voting-helpers/base-voting-helper';

import { fromSolDateFormattingT1 } from 'func/date';

function VaultOverview () {
  const dispatch = useDispatch();

  const userAddress = useSelector(userAddressMetamask);

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

  const userLockingEnd = fromSolDateFormattingT1(useSelector(votingLockingEnd));
  const updateOnClaim = useSelector(lastClaim);
  const agent = useSelector(votingAgent);
  const weight = useSelector(receivedWeight);

  const { votingInfo } = getVoteDelegation(agent, weight, userAddress);

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
      <h1>Overview</h1>
      <div>
        <h5>Q Vault Balance</h5>
        <p ref={userQVBalanceRef}>0 Q</p>

        <h5>Time Locked Amount</h5>
        <p ref={qVaultLockedAmountRef}>0 Q</p>

        <h5>Q Token Holder Reward Rate (p.a.)</h5>
        <p ref={interestRatePercentageRef}>0 %</p>

        <h5>Yearly Expected Reward</h5>
        <p ref={yearlyExpectedEarningsRef}> 0 Q</p>

        <h5>Q Address Balance</h5>
        <p ref={userAccountBalanceRef}>0 Q</p>

        <div className="card__line" />

        <h5>Voting Weight from Q Vault</h5>
        <p ref={userVotingWeightRef}>0 Q</p>

        <h5>Voting Locking End</h5>
        <p>{userLockingEnd}</p>

        <h5>Voting Status</h5>
        <p>
          <VoterStatus />
        </p>

        <h5>Vote Delegation</h5>
        <p className="card_text">{votingInfo}</p>
      </div>
    </CustomBlock>
  );
}

export default VaultOverview;
