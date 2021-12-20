import React, { useEffect } from 'react'

import CustomBlock from 'components/Base/CustomBlock'
import LoadingSpinner from 'components/Base/LoadingSpinner'

import { useDispatch, useSelector } from 'react-redux'
import { fN } from 'func/useful'
import {
  outstandingDebtSelector,
  totalCollateralLockedSelector,
  totalSavingBalanceSelector
} from 'store/borrowing-core/selectors'
import {
  getOutstandingDebt,
  getTotalCollateralLocked,
  getTotalSavingBalance
} from 'store/borrowing-core/action-creators'

function Overview () {
  const dispatch = useDispatch()

  const outstandingDebt = useSelector(outstandingDebtSelector)
  const totalSavingBalance = useSelector(totalSavingBalanceSelector)
  const totalCollateralLocked = useSelector(totalCollateralLockedSelector)

  useEffect(() => {
    dispatch(getOutstandingDebt())
    dispatch(getTotalSavingBalance())
    dispatch(getTotalCollateralLocked())
  }, [])

  return (
        <CustomBlock>
            <h1>Overview</h1>
            <h5>Total Saving Balance</h5>
            {!totalSavingBalance ? <LoadingSpinner /> : <p>{fN(totalSavingBalance) + ' QUSD'}</p>}
            <h5>Outstanding Debt</h5>
            {!outstandingDebt ? <LoadingSpinner /> : <p>{fN(outstandingDebt) + ' USD'}</p>}
            <h5>Total Collateral Locked</h5>
            {!totalCollateralLocked ? <LoadingSpinner /> : <p>{fN(totalCollateralLocked) + ' USD'}</p>}
        </CustomBlock>
  )
}

export default Overview
