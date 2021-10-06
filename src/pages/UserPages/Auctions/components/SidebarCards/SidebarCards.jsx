import React, { useEffect, useMemo, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/selectors/user-inf'
import { debtSB, loadingPerformNetting, surplusSB, systemBalanceSB } from 'store/selectors/system-balance'
import { lastAuctionModification } from 'store/selectors/auctions/auctions'
import { availableAmountSR } from 'store/selectors/system-reserve'
import { userBalance } from 'store/selectors/q-vault'

import { getDebt, getSurplus, getSystemBalance } from 'store/actions/action-creaters/system-balance'
import { getAvailableAmount } from 'store/actions/action-creaters/system-reserve'
import { getUserBalance } from 'store/actions/action-creaters/q-vault'
import { getEPDRUint } from 'contracts/handler/ContractsEPDR'

import Stats from 'components/Custom/PageLists/SidebarCards/Stats'
import SystemCard from 'components/Custom/PageLists/SidebarCards/SystemCard'

import ContractBalance from 'contracts/handler/ContractBalance'
import { StableCoinQUSD } from 'contracts/src/StableCoin'

import { fN } from 'func/useful'
import { fromWei } from 'func/balance'

function SidebarCards () {
  const dispatch = useDispatch()

  const userAddress = useSelector(userAddressMetamask)
  const [userBalanceQ, setUserBalanceQ] = useState(null)
  const [QUSDUserBalance, setQUSDUserBalance] = useState(0)

  const contractBalance = new ContractBalance(userAddress)
  const contractStableCoinQUSD = new StableCoinQUSD()

  const surplus = fN(useSelector(surplusSB))
  const debt = fN(useSelector(debtSB))
  const systemBalanceResult = fN(useSelector(systemBalanceSB))
  const availableAmount = fN(useSelector(availableAmountSR))
  const userQVBalance = fN(useSelector(userBalance))
  const loadingPerfNetting = useSelector(loadingPerformNetting)
  const isAuctionModified = useSelector(lastAuctionModification)

  const [reserveBalance, setReserveBalance] = useState('0')
  const [surplusLot, setSurplusLot] = useState('0')
  const [reserveLot, setReserveLot] = useState('0')

  useEffect(() => {
    window.web3.eth.getBalance(userAddress, (err, balance) => {
      if (err) {
        console.error(err)
      }
      setUserBalanceQ(fN(fromWei(balance)))
    })
  }, [isAuctionModified])

  useEffect(() => {
    dispatch(getSurplus())
    dispatch(getDebt())
    dispatch(getSystemBalance())
    dispatch(getAvailableAmount())
    // stats
    dispatch(getUserBalance(userAddress))
  }, [dispatch, loadingPerfNetting, isAuctionModified])

  useEffect(() => {
    contractBalance.getBalanceValue('SystemReserve', setReserveBalance)
    getEPDRUint('governed.EPDR.QUSD_surplusLot', setSurplusLot)
    getEPDRUint('governed.EPDR.reserveLot', setReserveLot)
    contractStableCoinQUSD
      .balanceOf(userAddress)
      .then((res) => {
        setQUSDUserBalance(fromWei(res))
      })
      .catch((e) => {
        setQUSDUserBalance(0)
        console.error(e)
      })
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
        value: fN(QUSDUserBalance) + ' QUSD'
      }
    ]
  }, [userQVBalance, userBalanceQ, QUSDUserBalance])

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
        title: 'Immediately available',
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
