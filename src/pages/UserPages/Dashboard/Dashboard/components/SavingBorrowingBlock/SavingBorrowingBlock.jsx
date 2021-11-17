import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { contractsToAddresses } from 'contracts/mapping/contract-to-address'
import { useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/user-inf/selectors'
import { mode } from 'store/dashboard-mode/selectors'

import CustomBlock from 'components/Base/CustomBlock'
import CardBlock from 'components/Base/CardBlock'
import Handler from './handler'
import LoadingSpinner from 'components/Base/LoadingSpinner'

import { remainDateTimeSince } from 'func/convertDate'
import { MODE } from 'components/Base/DashboardMode/DashboarModeButton'

const BTN_TYPES = {
  balance: 'of-balance',
  outstandingDebt: 'of-outstanding-debt'
}

function SavingBorrowingBlock () {
  const userAddress = useSelector(userAddressMetamask)
  const appMode = useSelector(mode)
  const handler = new Handler(userAddress)

  const [totalSupply, setTotalSupply] = useState('0')
  const [systemBalance, setSystemBalance] = useState('0')
  const [savingRate, setSavingRate] = useState('0')
  const [interestRate, setInterestRate] = useState('0')

  const [timeSinceRefreshBalance, setTimeSinceRefreshBalance] = useState('0')
  const [timeSinceUnixTimestampRefreshBalance, setTimeSinceUnixTimestampRefreshBalance] = useState('0')
  const [loadingTimeSinceRefreshBalance, setLoadingTimeSinceRefreshBalance] = useState(false)

  const [timeSinceOutstandingDebt, setTimeSinceOutstandingDeb] = useState('0')
  const [timeSinceUnixTimestampOutstandingDeb, setTimeSinceUnixTimestampOutstandingDeb] = useState('0')
  const [loadingTimeSinceOutstandingDeb, setLoadingTimeSinceOutstandingDeb] = useState(false)

  useEffect(async () => {
    handler.getTotalSupply(setTotalSupply)
    handler.getSystemBalance(setSystemBalance)
    handler.getSavingRate(setSavingRate)
    handler.getInterestRate(setInterestRate)
  }, [])

  useEffect(() => {
    setTimeSinceRefreshBalance('...')
    setTimeSinceOutstandingDeb('...')
    handler.getTimeSinceRefreshBalance(setTimeSinceRefreshBalance, setTimeSinceUnixTimestampRefreshBalance)
    handler.getTimeSinceOutstandingDebt(setTimeSinceOutstandingDeb, setTimeSinceUnixTimestampOutstandingDeb)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSinceRefreshBalance(remainDateTimeSince(timeSinceUnixTimestampRefreshBalance))
    }, 60000)
    return () => {
      clearInterval(interval)
    }
  }, [timeSinceUnixTimestampRefreshBalance])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSinceOutstandingDeb(remainDateTimeSince(timeSinceUnixTimestampOutstandingDeb))
    }, 60000)
    return () => {
      clearInterval(interval)
    }
  }, [timeSinceUnixTimestampOutstandingDeb])

  const onRefresh = useCallback((type) => {
    switch (type) {
      case BTN_TYPES.balance:
        handler.refreshTimeSinceRefreshBalance(setTimeSinceRefreshBalance, setLoadingTimeSinceRefreshBalance, setTimeSinceUnixTimestampRefreshBalance)
        break
      case BTN_TYPES.outstandingDebt:
        handler.refreshTimeSinceOutstandingDebt(setTimeSinceOutstandingDeb, setLoadingTimeSinceOutstandingDeb, setTimeSinceUnixTimestampOutstandingDeb)
        break
    }
  }, [])

  const dataArr = useMemo(() => {
    return [
      {
        title: 'QUSD Contract',
        firstContent: contractsToAddresses.StableCoinQUSD,
        btnTitle: null
      },
      {
        title: 'QUSD Saving Reward (p.a.)',
        firstContent: savingRate + ' %',
        btnTitle: null
      },
      {
        title: 'QUSD - QBTC Borrowing Fee (p.a.)',
        firstContent: interestRate + ' %',
        btnTitle: null
      },
      {
        title: 'QUSD System Balance',
        firstContent: systemBalance + ' QUSD',
        btnTitle: null
      },
      {
        title: 'QUSD Total Supply',
        firstContent: totalSupply + ' QUSD',
        btnTitle: null
      },
      {
        title: 'QUSD Saving time since refresh of balance',
        firstContent: timeSinceRefreshBalance,
        btnIcon: 'cached',
        iconFontSize: '20px',
        btnType: BTN_TYPES.balance
      },
      {
        title: 'QUSD - QBTC time since refresh of outstanding debt',
        firstContent: timeSinceOutstandingDebt,
        btnIcon: 'cached',
        iconFontSize: '20px',
        btnType: BTN_TYPES.outstandingDebt
      }
    ]
  }, [totalSupply, systemBalance, savingRate, interestRate,
    timeSinceRefreshBalance, timeSinceOutstandingDebt])

  const getIsLoading = (type) => {
    switch (type) {
      case BTN_TYPES.balance:
        return loadingTimeSinceRefreshBalance
      case BTN_TYPES.outstandingDebt:
        return loadingTimeSinceOutstandingDeb
      default:
        return false
    }
  }

  return (
    <CustomBlock>
      <h1>Saving & Borrowing</h1>
      {
        dataArr?.filter(el => appMode === MODE.basic ? el.btnTitle === null : el)
          .map((el) => {
            return (
            <CardBlock
              key={el.title.replace(' ', '-')}
              btnDisabled={getIsLoading(el.btnType)}
              title={el.title}
              iconFontSize={el.iconFontSize}
              btnIcon={getIsLoading(el.btnType) ? null : el.btnIcon}
              firstContent={el.firstContent}
              btnTitle={getIsLoading(el.btnType) ? <LoadingSpinner/> : el.btnTitle}
              btnHandler={!el.btnTitle && !el.btnIcon
                ? null
                : () => {
                    onRefresh(el.btnType)
                  }}
            />
            )
          })
      }
    </CustomBlock>

  )
}

export default SavingBorrowingBlock
