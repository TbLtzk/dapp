import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getRootNodeStakes,
  getRootWithdrawals,
  getMinimumRootTimeLock,
  setRootStakeToPanel,
  setRootWithdraw,
  setRootAnnounceWithdrawal
} from 'store/actions/action-creaters/root-contract'

import { isUserRootNode, rootNodeStake, withdrawals, rootMinimumTimeLock } from 'store/selectors/root-contract'

import { userAddressMetamask } from 'store/selectors/user-inf'
import { useForm } from 'react-hook-form'

import { fN } from 'func/useful'
import { fromWei, toWei } from 'func/balance'
import CustomBlock from 'components/Base/CustomBlock'
import FormInput from 'components/Base/Form/FormInput'
import Button from 'components/Base/Buttons/Button'
import { fromSolDateFormattingT1 } from 'func/date'
import { AccountStatusInfo, AccountStatusForm } from '../styles'
import { accountBalance } from 'store/selectors/q-vault'
import { getAccountBalance } from 'store/actions/action-creaters/q-vault'

function FormStaking () {
  const { register, errors, handleSubmit } = useForm()
  const dispatch = useDispatch()

  const userAccountBalance = useSelector(accountBalance)

  const isUserRoot = useSelector(isUserRootNode)
  const userAddress = useSelector(userAddressMetamask)
  const amountNodeStake = useSelector(rootNodeStake)
  const withdrawalsData = useSelector(withdrawals)
  const rootTimeLockMinimumBalance = useSelector(rootMinimumTimeLock)

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
                {isUserRoot ? <p>Member of Root Node Panel</p> : <p>Not a Member of Root Node Panel</p>}
            </div>
            {isUserRoot
              ? (
                <div>
                    <h5>Current Rank</h5>
                    <p>3#</p>
                </div>
                )
              : null}
        </>
  )

  return (
        <CustomBlock>
            <h1>Manage balance</h1>
            <AccountStatusInfo>
                {checkIsUserRootMember}
                <div>
                    <h5>Stake in Root Node Ranking</h5>
                    <p>{amountNodeStake + 'Q'}</p>
                </div>
                <div>
                    <h5>Q Balance</h5>
                    <p>{fN(userAccountBalance)}Q</p>
                </div>
                {Number(rootTimeLockMinimumBalance) > 0
                  ? (
                    <div>
                        <h5>Time locked amount</h5>
                        <p>{fN(rootTimeLockMinimumBalance)} Q </p>
                    </div>
                    )
                  : null}
                <div>
                    <h5>Announced for withdrawal</h5>
                    <p>{fromWei(withdrawalsData?.amount)} Q</p>
                </div>
                <div>
                    <h5>After</h5>
                    <p>{withdrawalsData ? fromSolDateFormattingT1(withdrawalsData?.endTime) : '-'}</p>
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

export default FormStaking
