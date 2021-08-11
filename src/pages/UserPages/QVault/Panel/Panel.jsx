import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/selectors/user-inf'
import { getUserBalance, getLockedAssets, getQVBalance, getMinimumQVaultTimeLock } from 'store/actions/action-creaters/q-vault'
import { userBalance, votingWeight, votingLockingEnd, qvBalance, lastClaim, qVaultMinimumTimeLock } from 'store/selectors/q-vault'

import { useAlert } from 'react-alert'

import VoterStatus from 'components/Custom/PageLists/VoterStatus'
import CustomBlock from 'components/Base/CustomBlock'

import QVaultHandler from '../handler'
import { fN, uintPerSecondToPerYearNumber } from 'func/useful'
import { fromWei } from 'func/balance'
import { fromSolDateFormattingT1 } from 'func/date'

export default function Panel () {
  const userAddressL = useSelector(userAddressMetamask)
  const qVaultLockedAmount = useSelector(qVaultMinimumTimeLock) // get min
  const timeLockedAmount = fromWei(qVaultLockedAmount) // convert min
  const balanceDetails = useSelector(qvBalance)
  const userQVBalanceL = useSelector(userBalance)
  const userVotingWeight = fN(useSelector(votingWeight))
  const userLockingEnd = fromSolDateFormattingT1(useSelector(votingLockingEnd))
  const updateOnClaim = useSelector(lastClaim)
  const [accountBalance, setAccountBalance] = useState()
  const [yearlyExpectedEarnings, setYearlyExpectedEarnings] = useState(0)

  const dispatch = useDispatch()
  const address = useSelector(userAddressMetamask)
  const qvHandler = new QVaultHandler(address, useDispatch(), useAlert())

  useEffect(() => {
    dispatch(getUserBalance(userAddressL))
    dispatch(getLockedAssets(userAddressL))
    dispatch(getMinimumQVaultTimeLock(userAddressL))
    dispatch(getQVBalance())
  }, [dispatch, updateOnClaim])

  useEffect(() => {
    qvHandler.setAccountBalance(setAccountBalance)
  })

  useEffect(() => {
    const interestRate = balanceDetails?.interestRate
      ? uintPerSecondToPerYearNumber(balanceDetails.interestRate)
      : 0
    let yearlyExpectedEarningsCalc = 0
    if (userQVBalanceL) {
      yearlyExpectedEarningsCalc = userQVBalanceL * ((1 + interestRate) / 100)
    }
    setYearlyExpectedEarnings(yearlyExpectedEarningsCalc)
  }, [balanceDetails, userQVBalanceL])

  return (
    <CustomBlock>
      <h1>Overview</h1>
      <div>
        <h5>Q Vault balance</h5>
        <p>{userQVBalanceL + ' Q'}</p>
        {timeLockedAmount > 0
          ? <>
            <h5>Time locked amount</h5>
            <p>{timeLockedAmount + ' Q'}</p>
          </>
          : null}
        <h5>Q Token Holder reward rate (p.a.)</h5>
        <p>{(balanceDetails?.interestRate ? fN(uintPerSecondToPerYearNumber(balanceDetails.interestRate)) : 0) + '%'}</p>
        <h5>Yearly expected reward</h5>
        <p>{fN(yearlyExpectedEarnings) + ' Q'}</p>
        <h5>Q address balance</h5>
        <p>{fN(accountBalance) + ' Q'}</p>

        <div className={'card__line'} />

        <h5>Q Voting Weight</h5>
        <p>{userVotingWeight + ' Q'}</p>
        <h5>Voting Locking End</h5>
        <p>{userLockingEnd}</p>
        <h5>Voting Status</h5>
        <VoterStatus />
      </div>
    </CustomBlock>
  )
}
