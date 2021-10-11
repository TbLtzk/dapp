import React, { useEffect, useState } from 'react'

import CustomBlock from 'components/Base/CustomBlock'
import LoadingSpinner from 'components/Base/LoadingSpinner'

import { useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/selectors/user-inf'
import CommonHandler from '../../handler'
import { fN } from 'func/useful'
import { transactionCounter } from 'store/selectors/transaction-handler'

function Overview () {
  const trCounter = useSelector(transactionCounter)

  const [totalDebt, setTotalDebt] = useState(0)
  const [loadingTotalDebt, setLoadingTotalDebt] = useState(true)
  const [totalColVal, setTotalColVal] = useState(0)
  const [loadingTotalColVal, setLoadingTotalColVal] = useState(true)
  const [totalSavingBalance, setTotalSavingBalance] = useState(0)
  const [loadingTotalSavingBalance, setLoadingTotalSavingBalance] = useState(false)

  const address = useSelector(userAddressMetamask)
  const commonHandler = new CommonHandler(address)

  const getOverviewStats = () => {
    commonHandler.setTotalSavingBalance(setTotalSavingBalance, setLoadingTotalDebt)
    commonHandler.setOutstandingDebt(setTotalDebt, setLoadingTotalColVal)
    commonHandler.setTotalCollateralLocked(setTotalColVal, setLoadingTotalSavingBalance)
  }

  useEffect(() => {
    if (!trCounter) {
      getOverviewStats()
    }
  }, [trCounter])

  return (
        <CustomBlock>
            <h1>Overview</h1>
            <h5>Total Saving Balance</h5>
            {!loadingTotalDebt ? <p>{fN(totalSavingBalance) + ' QUSD'}</p> : <LoadingSpinner />}
            <h5>Outstanding Debt</h5>
            {!loadingTotalColVal ? <p>{fN(totalDebt) + ' USD'}</p> : <LoadingSpinner />}
            <h5>Total Collateral Locked</h5>
            {!loadingTotalSavingBalance ? <p>{fN(totalColVal) + ' USD'}</p> : <LoadingSpinner />}
        </CustomBlock>
  )
}

export default Overview
