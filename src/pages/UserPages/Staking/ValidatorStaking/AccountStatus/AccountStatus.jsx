import React, { useEffect, useState } from 'react'
import Button from 'components/Base/Buttons/Button'
import CustomBlock from 'components/Base/CustomBlock'
import FormInput from 'components/Base/Form/FormInput'
import { useDispatch, useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/selectors/user-inf'
import { useForm } from 'react-hook-form'
import { errorHandler, fN } from 'func/useful'
import { fromSolDateFormattingT1 } from 'func/date'
import { AccountStatusForm, AccountStatusInfo } from '../../styles'
import {
  getAccountableTotalStake,
  getDelegatedStake,
  getOwnStake,
  getTotalStake,
  getMinimumValidatorsTimeLock,
  setEnterShortList,
  getIsUserValidator,
  setValidatorsWithdraw,
  setValidatorsAnnounceWithdrawal,
  setValidatorsCommitStake,
  getValidatorShortList,
  getValidatorWithdrawalInfo
} from 'store/actions/action-creaters/validators'
import {
  validatorsMinimumTimeLock,
  isUserValidator,
  accountableTotalStake,
  validatorShortList,
  validatorWithdrawalInfo
} from 'store/selectors/validators'
import { getAccountBalance } from 'store/actions/action-creaters/q-vault'
import { accountBalance } from 'store/selectors/q-vault'
import { fromWei } from 'func/balance'

export default function AccountStatus () {
  const { register: reg, handleSubmit: submit, errors } = useForm()
  const dispatch = useDispatch()
  const userAccountBalance = useSelector(accountBalance)
  const isThisUserValidator = useSelector(isUserValidator)
  const userAccountableTotalStake = useSelector(accountableTotalStake)
  const userValidatorShortList = useSelector(validatorShortList)
  const userValidatorWithdrawalInfo = useSelector(validatorWithdrawalInfo)
  const address = useSelector(userAddressMetamask)
  const validatorLockedAmount = useSelector(validatorsMinimumTimeLock)

  const [validatorRank, setValidatorRank] = useState(0)

  useEffect(() => {
    dispatch(getAccountBalance(address))
    dispatch(getIsUserValidator(address))
    dispatch(getMinimumValidatorsTimeLock(address))
    dispatch(getAccountableTotalStake(address))
    dispatch(getValidatorShortList())
    dispatch(getValidatorWithdrawalInfo(address))
    dispatch(getTotalStake(address))
    dispatch(getOwnStake(address))
    dispatch(getDelegatedStake(address))
  }, [])

  useEffect(() => {
    if (Array.isArray(userValidatorShortList) && userValidatorShortList.length > 0) {
      userValidatorShortList.forEach((el, key) => {
        if (address === el.validator) {
          setValidatorRank(key + 1)
        }
      })
    }
  }, [userValidatorShortList])

  const stakeToRanking = (formData) => {
    dispatch(setValidatorsCommitStake(address, formData.amount))
  }

  const announce = (formData) => {
    dispatch(setValidatorsAnnounceWithdrawal(address, formData.amount))
  }

  const withdrawFromRanking = (formData) => {
    dispatch(setValidatorsWithdraw(address, formData.amount))
  }

  const renderValidatorRanking = () => {
    if (isThisUserValidator) {
      return (
                <>
                    <div>
                        <h5>Status</h5>
                        <p>Active Validator</p>
                    </div>
                    <div>
                        <h5>Current Rank</h5>
                        <p>{validatorRank}#</p>
                    </div>
                </>
      )
    }
    return (
            <div>
                <h5>Status</h5>
                <p>Not a Validator</p>
            </div>
    )
  }

  const confirmValidation = () => {
    dispatch(setEnterShortList(address))
  }

  const renderConfValBtn = () => {
    if (!isThisUserValidator) {
      return (
                <div className="card__actions">
                    <Button type="default" title="Join Validator Ranking" handleButton={confirmValidation} />
                </div>
      )
    }
    return null
  }

  return (
        <CustomBlock>
            <h1>Manage balance</h1>
            <AccountStatusInfo>
                {renderValidatorRanking()}
                <div>
                    <h5>Stake in Validator Ranking</h5>
                    <p>{fN(userAccountableTotalStake)} Q</p>
                </div>
                {Number(validatorLockedAmount) > 0
                  ? (
                    <div>
                        <h5>Time locked amount</h5>
                        <p>{fN(validatorLockedAmount)} Q </p>
                    </div>
                    )
                  : null}
                <div>
                    <h5>Announced for withdrawal</h5>
                    <p>{fromWei(userValidatorWithdrawalInfo.amount)} Q</p>
                </div>
                <div>
                    <h5>After</h5>
                    <p>
                        {userValidatorWithdrawalInfo.endTime === 0
                          ? '-'
                          : fromSolDateFormattingT1(userValidatorWithdrawalInfo.endTime)}
                    </p>
                </div>
                <div>
                    <h5>Personal balance</h5>
                    <p>{fN(userAccountBalance)} Q</p>
                </div>
            </AccountStatusInfo>
            <h4>Amount</h4>
            <AccountStatusForm>
                <div className={'account-status__form-input'}>
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
                    <Button type="default" title="Announce Withdrawal" handleButton={submit(announce)} />
                    <Button type="default" title="Withdraw from Ranking" handleButton={submit(withdrawFromRanking)} />
                </div>
            </AccountStatusForm>
            {renderConfValBtn()}
        </CustomBlock>
  )
}
