import React, { useEffect, useState } from 'react'
import LoadingSpinner from 'components/Base/LoadingSpinner'
import CardBlock from 'components/Base/CardBlock'
import { useDispatch, useSelector } from 'react-redux'
import { lastUpdateOfCompoundRate, loadingUpdateOfCompoundRate } from 'store/validation-reward-pools/selectors'
import { setVRPUpdateValidatorsCompoundRate } from 'store/validation-reward-pools/action-creators'

import { remainDateTimeSince } from 'func/convertDate'

import { userAddressMetamask } from 'store/user-inf/selectors'

export default function RefreshDelegationUpdate () {
  const dispatch = useDispatch()

  const userAddress = useSelector(userAddressMetamask)
  const lastUpdateCompoundRate = useSelector(lastUpdateOfCompoundRate)
  const loadingUpdateCompoundRate = useSelector(loadingUpdateOfCompoundRate)
  const [timeDelegationUpdate, setTimeDelegationUpdate] = useState(0)
  const title = 'Time Since Last Refresh of User Delegations'

  useEffect(() => {
    setTimeDelegationUpdate(remainDateTimeSince(lastUpdateCompoundRate))
  }, [lastUpdateCompoundRate])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDelegationUpdate(remainDateTimeSince(lastUpdateCompoundRate))
    }, 60000)
    return () => {
      clearInterval(interval)
    }
  }, [timeDelegationUpdate])

  const btnHandler = () => {
    dispatch(setVRPUpdateValidatorsCompoundRate(userAddress))
  }

  return (
        <CardBlock
            title={title}
            firstContent={timeDelegationUpdate}
            btnTitle={loadingUpdateCompoundRate ? <LoadingSpinner /> : ''}
            btnHandler={btnHandler}
            btnDisabled={loadingUpdateCompoundRate}
            btnIcon={loadingUpdateCompoundRate ? '' : 'cached'}
            iconFontSize="20px"
        />
  )
}
