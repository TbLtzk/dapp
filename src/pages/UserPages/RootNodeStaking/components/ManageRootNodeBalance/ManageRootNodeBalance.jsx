import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getRootNodeStakes,
  getRootWithdrawals,
  getMinimumRootTimeLock,
  setRootStakeToPanel,
  setRootWithdraw,
  setRootAnnounceWithdrawal
} from 'store/root-node/action-creators'

import {
  isUserRootNode,
  rootNodeStake,
  withdrawals,
  rootMinimumTimeLock,
  rootMembersData
} from 'store/root-node/selectors'

import { userAddressMetamask } from 'store/user-inf/selectors'
import { useForm } from 'react-hook-form'

import { fN } from 'func/useful'
import { fromWei, toWei } from 'func/balance'
import CustomBlock from 'components/Base/CustomBlock'
import FormInput from 'components/Base/Form/FormInput'
import Button from 'components/Base/Buttons/Button'
import { fromSolDateFormattingT1 } from 'func/date'
import { AccountStatusInfo, AccountStatusForm } from '../../styles'
import { accountBalance } from 'store/q-vault/selectors'
import { getAccountBalance } from 'store/q-vault/action-creators'

function ManageRootNodeBalance () {
  const { register, errors, handleSubmit } = useForm()
  const dispatch = useDispatch()

  const userAccountBalance = useSelector(accountBalance)

  const isUserRoot = useSelector(isUserRootNode)
  const userAddress = useSelector(userAddressMetamask)
  const amountNodeStake = useSelector(rootNodeStake)
  const withdrawalsData = useSelector(withdrawals)
  const rootTimeLockMinimumBalance = useSelector(rootMinimumTimeLock)
  const rootMembersArray = useSelector(rootMembersData)

  useEffect(() => {
    dispatch(getAccountBalance(userAddress))
    dispatch(getRootNodeStakes(userAddress))
    dispatch(getRootWithdrawals(userAddress))
    dispatch(getMinimumRootTimeLock(userAddress))
  }, [])

  const onStakeToPanel = (formData) => {
    dispatch(setRootStakeToPanel({ from: userAddress, value: toWei(formData?.amount) }))
  }

  const onWithdrawFromPanel = (formData) => {
    dispatch(setRootWithdraw(toWei(formData?.amount), userAddress, { from: userAddress }))
  }

  const onAnnounce = (formData) => {
    dispatch(setRootAnnounceWithdrawal(toWei(formData?.amount), { from: userAddress }))
  }

  const checkIsUserRootMember = (
        <>
            <div>
                <h5>Status</h5>
                {isUserRoot ? <p>Member of root node panel</p> : <p>Not a member of root node panel</p>}
            </div>
            {isUserRoot
              ? (
                <div>
                    <h5>Current Rank</h5>
                    <p>
                        {!rootMembersArray?.rootNodeData?.length
                          ? '0 #'
                          : rootMembersArray?.rootNodeData?.find((user) => user.address === userAddress).rank +
                              ' #'}
                    </p>
                </div>
                )
              : null}
        </>
  )

  return (
        <CustomBlock>
            <h1>Manage Balance</h1>
            <AccountStatusInfo>
                {checkIsUserRootMember}
                <div>
                    <h5>Stake in Root Node Ranking</h5>
                    <p>{fN(amountNodeStake) + ' Q'}</p>
                </div>
                <div>
                    <h5>Q Balance</h5>
                    <p>{fN(userAccountBalance)} Q</p>
                </div>
                {Number(rootTimeLockMinimumBalance) > 0
                  ? (
                    <div>
                        <h5>Time Locked Amount</h5>
                        <p>{fN(rootTimeLockMinimumBalance)} Q </p>
                    </div>
                    )
                  : null}
                <div>
                    <h5>Announced for Withdrawal</h5>
                    <p>{fN(fromWei(withdrawalsData?.amount)) + ' Q'}</p>
                </div>
                <div>
                    <h5>Announcement Status</h5>
                    <p>{!Number(withdrawalsData?.amount) ? '-' : 'Pending'}</p>
                </div>
                <div>
                    <h5>Announcement End</h5>
                    {!Number(withdrawalsData?.amount)
                      ? (
                        <p>-</p>
                        )
                      : (
                        <p>{withdrawalsData ? fromSolDateFormattingT1(withdrawalsData?.endTime) : '-'}</p>
                        )}
                </div>
            </AccountStatusInfo>
            <h4>Amount</h4>
            <AccountStatusForm>
                <div className="account-status__form-input">
                    <FormInput
                        color={true}
                        name="amount"
                        lbl="Q"
                        type="number"
                        placeholder="0.00"
                        ref={register({ required: 'Field is required!' })}
                        valid={errors?.amount?.message}
                        onChange={() => {}}
                    />
                </div>
                <div className="account-status__form-actions">
                    <Button type="default" title="Stake to Panel" handleButton={handleSubmit(onStakeToPanel)} />
                    <Button type="default" title="Announce Withdrawal" handleButton={handleSubmit(onAnnounce)} />
                    <Button
                        type="default"
                        title="Withdraw from Panel"
                        handleButton={handleSubmit(onWithdrawFromPanel)}
                    />
                </div>
            </AccountStatusForm>
        </CustomBlock>
  )
}

export default ManageRootNodeBalance
