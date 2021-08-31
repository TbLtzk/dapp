import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRootNodeStakes, getWithdrawals, getMinimumRootTimeLock } from 'store/actions/action-creaters/root-contract'
import {
  isUserRootNode,
  lastActionRoot,
  loadingCheckingRootNode,
  rootNodeStake,
  withdrawals
} from 'store/selectors/root-contract'
import { userAddressMetamask } from 'store/selectors/user-inf'

import { useForm } from 'react-hook-form'

import { fN } from 'func/useful'
import { fromWei } from 'func/balance'
import CustomBlock from 'components/Base/CustomBlock'
import FormInput from 'components/Base/Form/FormInput'
import ActionButtons from 'pages/UserPages/Staking/FormStaking/ActionButtons'
import RootService from 'contracts/src/Root'

import { fromSolDateFormattingT1 } from 'func/date'
import { AccountStatusInfo, AccountStatusForm } from '../styles'

function FormStaking () {
  const {
    register,
    errors,
    handleSubmit
  } = useForm()
  const dispatch = useDispatch()
  const rootService = new RootService()
  const [userBalance, setUserBalance] = useState(null)

  const isUserRoot = useSelector(isUserRootNode)
  const loadingCheckingRoot = useSelector(loadingCheckingRootNode)
  const userAddress = useSelector(userAddressMetamask)
  const amountNodeStake = useSelector(rootNodeStake)
  const withdrawalsData = useSelector(withdrawals)
  const lastUpdateRoot = useSelector(lastActionRoot)

  function getInfo () {
    if (userAddress) {
      dispatch(getRootNodeStakes(rootService, userAddress))
      dispatch(getWithdrawals(userAddress))
      dispatch(getMinimumRootTimeLock(userAddress))
    }
  }

  useEffect(() => {
    getInfo()
  }, [userAddress, isUserRoot, dispatch, lastUpdateRoot])

  useEffect(() => {
    window.web3.eth.getBalance(userAddress, (error, balance) => {
      if (error) {
        console.error(error)
      }
      const userBalance = fromWei(balance)
      setUserBalance(fN(userBalance))
    })
  }, [lastUpdateRoot])

  const handleBtn = useMemo(() => {
    return handleSubmit
  }, [handleSubmit])

  return (
    <CustomBlock>
      <h1>Manage balance</h1>
      <AccountStatusInfo>
        <div>
          <h5>Status</h5>
          {loadingCheckingRoot
            ? null
            : isUserRoot
              ? (
                <p>Member of Root Node Panel</p>
                )
              : (
                <p>Not a Member of Root Node Panel</p>
                )}
        </div>
        <div>
          <h5>Stake in Root Node Panel</h5>
          <p>{amountNodeStake + 'Q'}</p>
        </div>
        <div>
          <h5>Q Address Balance</h5>
          <p>{userBalance || 0}Q</p>
        </div>
        <div>
          <h5>Announcement withdrawal status</h5>
          {withdrawalsData?.pending
            ? (
              <p>
                Announced amount
                <br/>
                End time for announcement
              </p>
              )
            : null}

          <p>{withdrawalsData?.pending ? 'pending' : 'not-active'}</p>
          {withdrawalsData?.pending
            ? (
              <>
                <p>{withdrawalsData ? fromWei(withdrawalsData?.amount) : 0}Q</p>
                <p>
                  {withdrawalsData?.endTime !== '0'
                    ? fromSolDateFormattingT1(Number(withdrawalsData?.endTime))
                    : '-'}
                </p>
              </>
              )
            : null}
        </div>
      </AccountStatusInfo>
      <h4>Amount</h4>
      <AccountStatusForm>
        <div className={'account-status__form-input'}>
          <FormInput
            color={true}
            name="amount"
            lbl="Q"
            type="number"
            placeholder={'0.00'}
            ref={register({ required: 'Field is required!' })}
            valid={errors?.amount?.message}
            onChange={() => {
            }}
          />
        </div>
        <div className="account-status__form-actions">
          <ActionButtons handleSubmit={handleBtn} actionAfterSubmit={getInfo}/>
        </div>
      </AccountStatusForm>
    </CustomBlock>
  )
}

export default FormStaking
