import React, { useEffect, useState } from 'react'
import Button from 'components/Base/Buttons/Button'
import CustomBlock from 'components/Base/CustomBlock'
import FormInput from 'components/Base/Form/FormInput'
import { useDispatch, useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/user-inf/selectors'
import { useForm } from 'react-hook-form'
import { errorHandler, fN } from 'func/useful'
import { fromSolDateFormattingT1 } from 'func/date'
import { AccountStatusForm, AccountStatusInfo } from '../../styles'
import {
  getAccountableTotalStake,
  getMinimumValidatorsTimeLock,
  setValidatorsEnterShortList,
  getIsUserValidator,
  setValidatorsWithdraw,
  setValidatorsAnnounceWithdrawal,
  setValidatorsCommitStake,
  getValidatorShortList,
  getValidatorWithdrawalInfo
} from 'store/validators/action-creators'
import {
  validatorsMinimumTimeLock,
  isUserValidator,
  accountableTotalStake,
  validatorShortList,
  validatorWithdrawalInfo
} from 'store/validators/selectors'
import { getAccountBalance } from 'store/q-vault/action-creators'
import { accountBalance } from 'store/q-vault/selectors'
import { fromWei } from 'func/balance'

export default function AccountStatus () {
  const { register: reg, handleSubmit: submit, errors } = useForm()

  const dispatch = useDispatch()

  const address = useSelector(userAddressMetamask)

  const userAccountBalance = useSelector(accountBalance)
  const isThisUserValidator = useSelector(isUserValidator)
  const userAccountableTotalStake = useSelector(accountableTotalStake)
  const userValidatorShortList = useSelector(validatorShortList)
  const userValidatorWithdrawalInfo = useSelector(validatorWithdrawalInfo)
  const validatorLockedAmount = useSelector(validatorsMinimumTimeLock)

  const [validatorRank, setValidatorRank] = useState(0)

  useEffect(() => {
    dispatch(getAccountBalance(address))
    dispatch(getIsUserValidator(address))
    dispatch(getMinimumValidatorsTimeLock(address))
    dispatch(getAccountableTotalStake(address))
    dispatch(getValidatorShortList())
    dispatch(getValidatorWithdrawalInfo(address))
  }, [])

  useEffect(() => {
    if (Array.isArray(userValidatorShortList) && userValidatorShortList.length > 0) {
      userValidatorShortList.forEach((el, key) => {
        if (address === el.validator) {
          setValidatorRank(key + 1)
        }
      })
    }
  }, [userValidatorShortList, isThisUserValidator])

  const stakeToRanking = (formData) => {
    dispatch(setValidatorsCommitStake(address, formData.amount))
  }

  const announceWithdrawal = (formData) => {
    dispatch(setValidatorsAnnounceWithdrawal(address, formData.amount))
  }

  const withdrawFromRanking = (formData) => {
    dispatch(setValidatorsWithdraw(address, formData.amount))
  }

  const confirmValidation = () => {
    dispatch(setValidatorsEnterShortList(address))
  }

  const confirmValidatorButton = !isThisUserValidator
    ? (
        <div className="card__actions">
            <Button type="default" title="Join Validator Ranking" handleButton={confirmValidation} />
        </div>
      )
    : null

  const checkIsUserValidator = (
        <>
            <div>
                <h5>Status</h5>
                {isThisUserValidator ? <p>Active validator</p> : <p>Not a validator</p>}
            </div>
            {isThisUserValidator
              ? (
                <div>
                    <h5>Current Rank</h5>
                    <p>{validatorRank} #</p>
                </div>
                )
              : null}
        </>
  )

  return (
        <CustomBlock>
            <h1>Manage Balance</h1>
            <AccountStatusInfo>
                {checkIsUserValidator}
                <div>
                    <h5>Stake in Validator Ranking</h5>
                    <p>{fN(userAccountableTotalStake)} Q</p>
                </div>
                <div>
                    <h5>Q Balance</h5>
                    <p>{fN(userAccountBalance)} Q</p>
                </div>
                {Number(validatorLockedAmount) > 0
                  ? (
                    <div>
                        <h5>Time Locked Amount</h5>
                        <p>{fN(validatorLockedAmount)} Q </p>
                    </div>
                    )
                  : null}
                <div>
                    <h5>Announced for Withdrawal</h5>
                    <p>{fromWei(userValidatorWithdrawalInfo.amount)} Q</p>
                </div>
                <div>
                    <h5>Announcement Status</h5>
                    <p>{!Number(userValidatorWithdrawalInfo?.amount) ? '-' : 'Pending'}</p>
                </div>
                <div>
                    <h5>Announcement End</h5>
                    {!Number(userValidatorWithdrawalInfo?.amount)
                      ? (
                        <p>-</p>
                        )
                      : (
                        <p>
                            {userValidatorWithdrawalInfo
                              ? fromSolDateFormattingT1(userValidatorWithdrawalInfo.endTime)
                              : '-'}
                        </p>
                        )}
                </div>
            </AccountStatusInfo>
            <h4>Amount</h4>
            <AccountStatusForm>
                <div className="account-status__form-input">
                    <FormInput
                        color={true}
                        name="amount"
                        type="number"
                        lbl="Q"
                        placeholder="0.00"
                        ref={reg({
                          required: 'Field is required!',
                          min: 0
                        })}
                        valid={errorHandler(errors, 'amount')}
                    />
                </div>
                <div className="account-status__form-actions">
                    <Button type="default" title="Stake to Ranking" handleButton={submit(stakeToRanking)} />
                    <Button type="default" title="Announce Withdrawal" handleButton={submit(announceWithdrawal)} />
                    <Button type="default" title="Withdraw from Ranking" handleButton={submit(withdrawFromRanking)} />
                </div>
            </AccountStatusForm>
            {confirmValidatorButton}
        </CustomBlock>
  )
}
