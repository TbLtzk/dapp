import React, { useEffect, useMemo, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/user-inf/selectors'
import { debtSB, loadingPerformNetting, surplusSB, systemBalanceSB } from 'store/system-balance/selectors'
import { lastAuctionModification } from 'store/auctions/selectors'
import { availableAmountSR, reserveBalanceSelector } from 'store/system-reserve/selectors'
import { accountBalance, userBalance } from 'store/q-vault/selectors'

import { getDebt, getSurplus, getSystemBalance } from 'store/system-balance/action-creators'
import { getAvailableAmount, getSystemReserveBalance } from 'store/system-reserve/action-creators'
import { getAccountBalance, getUserBalance } from 'store/q-vault/action-creators'
import { getEPDRUint } from 'contracts/helpers/epdr-param-helper'

import Stats from 'components/Custom/PageLists/SidebarCards/Stats'
import SystemCard from 'components/Custom/PageLists/SidebarCards/SystemCard'

import { fN } from 'func/useful'
import { getSavingAviableToDeposit } from 'store/saving-assets/action-creators'
import { savingAviableToDepositSelector } from 'store/saving-assets/selectors'

function SidebarCards () {
  const dispatch = useDispatch()

  const userAddress = useSelector(userAddressMetamask)
  const userBalanceQ = useSelector(accountBalance)
  const surplus = fN(useSelector(surplusSB))
  const debt = fN(useSelector(debtSB))
  const QUSDUserBalanceAmount = useSelector(savingAviableToDepositSelector)

  const systemBalanceResult = fN(useSelector(systemBalanceSB))
  const availableAmount = fN(useSelector(availableAmountSR))
  const userQVBalance = fN(useSelector(userBalance))
  const loadingPerfNetting = useSelector(loadingPerformNetting)
  const isAuctionModified = useSelector(lastAuctionModification)
  const reserveBalance = useSelector(reserveBalanceSelector)

  const [surplusLot, setSurplusLot] = useState('0')
  const [reserveLot, setReserveLot] = useState('0')

  useEffect(() => {
    dispatch(getAccountBalance(userAddress))
  }, [isAuctionModified])

  useEffect(() => {
    dispatch(getSurplus())
    dispatch(getDebt())
    dispatch(getSystemBalance())
    dispatch(getAvailableAmount())
    dispatch(getSavingAviableToDeposit())
    dispatch(getUserBalance(userAddress))
  }, [dispatch, loadingPerfNetting, isAuctionModified])

  useEffect(() => {
    dispatch(getSystemReserveBalance())
    getEPDRUint('governed.EPDR.QUSD_surplusLot', setSurplusLot)
    getEPDRUint('governed.EPDR.reserveLot', setReserveLot)
  }, [loadingPerfNetting, isAuctionModified])

  const statsData = useMemo(() => {
    return [
      {
        title: 'Available Q Balance',
        value: userBalanceQ + ' Q'
      },
      {
        title: 'Q Balance in Q Vault',
        value: userQVBalance + ' Q'
      },
      {
        title: 'QUSD Balance',
        value: fN(QUSDUserBalanceAmount) + ' QUSD'
      }
    ]
  }, [userQVBalance, userBalanceQ, QUSDUserBalanceAmount])

  const systemBalance = useMemo(() => {
    return [
      {
        title: 'Collected Surplus',
        value: surplus + ' QUSD'
      },
      {
        title: 'Open Debt',
        value: debt + ' QUSD'
      },
      {
        title: 'Balance',
        value: systemBalanceResult + ' QUSD'
      },
      {
        title: 'Surplus Auction Lot',
        value: surplusLot + ' QUSD'
      }
    ]
  }, [surplus, debt, systemBalanceResult, surplusLot])

  const systemReserve = useMemo(() => {
    return [
      {
        title: 'Reserve Balance',
        value: reserveBalance + ' Q'
      },
      {
        title: 'Immediately Available',
        value: availableAmount + ' Q'
      },
      {
        title: 'Debt Auction Lot',
        value: reserveLot + ' Q'
      }
    ]
  }, [availableAmount, reserveBalance, reserveLot])

  return (
        <div>
            <Stats statsData={statsData} type="Auction" />
            <SystemCard data={systemBalance} title="QUSD System Balance" />
            <SystemCard data={systemReserve} title="Q System Reserve" />
        </div>
  )
}

export default SidebarCards
