import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/user-inf/selectors'
import {
  getAccountBalance,
  getUserBalance,
  getLockedAssets,
  getQVBalance,
  getMinimumQVaultTimeLock
} from 'store/q-vault/action-creators'
import {
  accountBalance,
  userBalance,
  votingWeight,
  votingLockingEnd,
  qvBalance,
  lastClaim,
  qVaultMinimumTimeLock,
  votingAgent,
  receivedWeight
} from 'store/q-vault/selectors'

import VoterStatus from 'components/Custom/PageLists/VoterStatus'
import CustomBlock from 'components/Base/CustomBlock'

import { fN, uintPerSecondToPerYearNumber } from 'func/useful'
import { fromSolDateFormattingT1 } from 'func/date'
import { getVoteDelegation } from 'contracts/helpers/voting-helpers/base-voting-helper'

export default function Panel () {
  const userAddress = useSelector(userAddressMetamask)
  const qVaultLockedAmount = useSelector(qVaultMinimumTimeLock)
  const balanceDetails = useSelector(qvBalance)
  const userQVBalanceL = useSelector(userBalance)
  const userAccountBalance = useSelector(accountBalance)
  const userVotingWeight = useSelector(votingWeight)
  const userLockingEnd = fromSolDateFormattingT1(useSelector(votingLockingEnd))
  const updateOnClaim = useSelector(lastClaim)
  const agent = useSelector(votingAgent)
  const weight = useSelector(receivedWeight)

  const [yearlyExpectedEarnings, setYearlyExpectedEarnings] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAccountBalance(userAddress))
    dispatch(getUserBalance(userAddress))
    dispatch(getLockedAssets(userAddress))
    dispatch(getMinimumQVaultTimeLock(userAddress))
    dispatch(getQVBalance())
  }, [dispatch, updateOnClaim])

  const { votingInfo } = getVoteDelegation(agent, weight, userAddress)

  useEffect(() => {
    const interestRate = balanceDetails?.interestRate
      ? uintPerSecondToPerYearNumber(balanceDetails.interestRate)
      : 0
    let yearlyExpectedEarningsCalc = 0
    if (userQVBalanceL) {
      yearlyExpectedEarningsCalc = userQVBalanceL * (interestRate / 100)
    }
    setYearlyExpectedEarnings(yearlyExpectedEarningsCalc)
    return () => {
      setYearlyExpectedEarnings(0)
    }
  }, [balanceDetails, userQVBalanceL])

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
                <p>
                    {(balanceDetails?.interestRate
                      ? fN(uintPerSecondToPerYearNumber(balanceDetails.interestRate))
                      : 0) + ' %'}
                </p>
                <h5>Yearly Expected Reward</h5>
                <p>{fN(yearlyExpectedEarnings) + ' Q'}</p>
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
  )
}
