import React from 'react'
import { useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'
import { setLockAmount, setUnlockAmount } from 'store/actions/action-creaters/q-vault'
import { userAddressMetamask } from 'store/selectors/user-inf'

import ButtonLinkArrow from 'components/Base/Buttons/ButtonLinkArrow'
import CustomBlock from 'components/Base/CustomBlock'
import FormInput from 'components/Base/Form/FormInput'
import Button from 'components/Base/Buttons/Button'

import 'react-datepicker/dist/react-datepicker.css'
import { userBalance, votingWeight } from 'store/selectors/q-vault'

export default function LockCoin () {
  const { register: reg1, handleSubmit: submit1, errors: err1, setValue: setLockMax } = useForm()
  const { register: reg3, handleSubmit: submit3, errors: err3, setValue: setUnlockMax } = useForm()

  const dispatch = useDispatch()

  const userVotingWeight = useSelector(votingWeight)
  const userBalanceAmount = useSelector(userBalance)

  const address = useSelector(userAddressMetamask)

  function handleUnlockMax () {
    setUnlockMax('amountQ', userVotingWeight)
  }

  function handleLockMax () {
    setLockMax('amountQ', userBalanceAmount - userVotingWeight)
  }

  function lockCoinL (formData) {
    dispatch(setLockAmount(address, formData.amountQ))
    setLockMax('amountQ', null)
  }

  function unlockCoinL (formData) {
    dispatch(setUnlockAmount(address, formData.amountQ))
    setUnlockMax('amountQ', null)
  }

  return (
        <CustomBlock>
            <h1>Lock Your Q Tokens for Voting</h1>
            <h5 style={{ marginBottom: '15px' }}>Participate in Q Governance with your Locked Amount</h5>
            <h4>Increase Voting Weight by</h4>
            <div className={'card__one-line-form'}>
                <FormInput
                    color={true}
                    min={0}
                    lbl="Q"
                    onMaxClick={handleLockMax}
                    name="amountQ"
                    type="number"
                    placeholder="0.0"
                    ref={reg1({ required: 'Field is required!' })}
                    valid={err1.amountQ?.message}
                />
                <Button type="outline" title="Increase" width="90px" handleButton={submit1(lockCoinL)} />
            </div>

            <h4>Reduce Voting Weight by</h4>
            <div className={'card__one-line-form'}>
                <FormInput
                    color={true}
                    min={0}
                    name="amountQ"
                    type="number"
                    lbl="Q"
                    onMaxClick={handleUnlockMax}
                    placeholder="0.0"
                    ref={reg3({ required: 'Field is required!' })}
                    valid={err3.amountQ?.message}
                />
                <Button type="outline" title="Reduce" width="90px" handleButton={submit3(unlockCoinL)} />
            </div>
            <div className="card__actions">
                <ButtonLinkArrow title="Go to Governance" path="/q-governance" />
            </div>
        </CustomBlock>
  )
}
