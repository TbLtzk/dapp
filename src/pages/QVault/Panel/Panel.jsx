import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isEmpty } from 'lodash';

import CustomBlock from 'components/Base/CustomBlock';
import VoterStatus from 'components/Custom/PageLists/VoterStatus';

import {
  getAccountBalance,
  getLockedAssets,
  getMinimumQVaultTimeLock,
  getQVBalance,
  getUserBalance
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
  votingWeight
} from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { getVoteDelegation } from 'contracts/helpers/voting-helpers/base-voting-helper';

import { fromSolDateFormattingT1 } from 'func/date';
import { fN } from 'func/useful';

export default function Panel () {
  const dispatch = useDispatch();

  const userAddress = useSelector(userAddressMetamask);
  const qVaultLockedAmount = useSelector(qVaultMinimumTimeLock);
  const balanceDetails = useSelector(qvBalance);
  const userQVBalanceL = useSelector(userBalance);
  const userAccountBalance = useSelector(accountBalance);
  const userVotingWeight = useSelector(votingWeight);
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

  return (
    <CustomBlock>
      <h1>Overview</h1>
      <div>
        <h5>Q Vault Balance</h5>
        <p>{fN(userQVBalanceL) + ' Q'}</p>
        {Number(qVaultLockedAmount) > 0
          ? (
            <>
              <h5>Time Locked Amount</h5>
              <p>{fN(qVaultLockedAmount) + ' Q'}</p>
            </>
          )
          : null}
        <h5>Q Token Holder Reward Rate (p.a.)</h5>
        <p>{isEmpty(balanceDetails) ? '0 %' : balanceDetails?.interestRatePercentage + ' %'}</p>
        <h5>Yearly Expected Reward</h5>
        <p>{isEmpty(balanceDetails) ? '0 Q' : balanceDetails?.yearlyExpectedEarnings + ' Q'}</p>
        <h5>Q Address Balance</h5>
        <p>{fN(userAccountBalance) + ' Q'}</p>

        <div className="card__line" />

        <h5>Voting Weight from Q Vault</h5>
        <p>{fN(userVotingWeight) + ' Q'}</p>
        <h5>Voting Locking End</h5>
        <p>{userLockingEnd}</p>
        <h5>Voting Status</h5>
        <p>
          <VoterStatus />
        </p>
        <h5>Vote Delegation</h5>
        <p>{votingInfo}</p>
      </div>
    </CustomBlock>
  );
}
