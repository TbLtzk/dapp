import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'
import { stakeToPanel, announceWithdrawal, withdraw } from 'store/actions/action-creaters/root-contract'
import { userAddressMetamask } from 'store/selectors/user-inf'

import RootService from 'contracts/src/Root'

import Button from 'components/Base/Buttons/Button'

import { toWei } from 'func/balance'

function ActionButtons (props) {
  const { handleSubmit } = props
  const dispatch = useDispatch()
  const rootService = new RootService()
  const userAddress = useSelector(userAddressMetamask)

  const onStakeToPanel = useCallback(async (data) => {
    dispatch(stakeToPanel(rootService,
      {
        from: userAddress,
        value: toWei(data?.amount)
      }
    ))
  }, [])

  const onWithdrawFromPanel = useCallback(async (data) => {
    dispatch(withdraw(rootService,
      toWei(data?.amount),
      userAddress,
      {
        from: userAddress
      }))
  }, [dispatch])

  const onAnnounce = useCallback(async (data) => {
    dispatch(announceWithdrawal(rootService,
      toWei(data?.amount),
      {
        from: userAddress
      }))
  }, [dispatch])

  return (
    <div className={'card__actions'}>
      <Button
        type="full-width"
        title="Stake to Panel"
        handleButton={handleSubmit(onStakeToPanel)}
      />
      <Button
        type="full-width"
        title="Announce"
        handleButton={handleSubmit(onAnnounce)}
      />
      <Button
        type="full-width"
        title="Withdraw from Panel"
        handleButton={handleSubmit(onWithdrawFromPanel)}
      />
    </div>
  )
}

ActionButtons.propTypes = {
  handleSubmit: PropTypes.func
}

export default ActionButtons
