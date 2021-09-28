import React, { useEffect, useState } from 'react'
import PageWrap from 'components/Base/PageWrap'
import Button from 'components/Base/Buttons/Button'
import Overview from './components/Overview'
import SavingCryptoAssets from './components/SavingCryptoAssets'
import BorrowCryptoAssets from './components/BorrowCryptoAssets'
import LoadingTransaction from 'components/Custom/LoadingTransaction'

import { BorrowingCoreQUSD } from 'contracts/src/BorrowingCore'
import { contractsToAddresses } from 'contracts/mapping/contract-to-address'
import { userAddressMetamask } from 'store/selectors/user-inf'
import { useSelector } from 'react-redux'

function SavingAndBorrowing () {
  const address = useSelector(userAddressMetamask)
  const [isLoading, setIsLoading] = useState(false)
  const { ethereum } = window

  const createVault = async (collateral) => {
    try {
      setIsLoading(true)
      const contract = new BorrowingCoreQUSD(contractsToAddresses.BorrowingCoreQUSD)
      await contract.createVault(address, collateral)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  async function setAddQBTC (res) {
    try {
      const tokenAddress = '0x1115Ab7257e47Ef97Ea0E8254E999a8be8981952'
      const tokenSymbol = 'QBTC'
      const tokenDecimals = 18
      const qbtcWasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals
          }
        }
      })
      res = qbtcWasAdded
    } catch (error) {
      console.error(error)
    }
  }

  async function setAddQUSD (res) {
    try {
      const tokenAddress = '0xdC98b08363f3BfC73195dc6b532e39C51EC3c3bC'
      const tokenSymbol = 'QUSD'
      const tokenDecimals = 18
      const qusdWasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals
          }
        }
      })
      res = qusdWasAdded
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setAddQBTC()
    setAddQUSD()
  }, [])

  return (
    <PageWrap
      wrapContentClasses={'wrap-content__column-2-1'}
      headerTitle={'Saving and Borrowing'}
      headerExtra={(
        <Button
          icon="plus-circle-outline"
          handleButton={() => createVault('QBTC')}
          title="Create QBTC vault"
        />
      )}
    >
      <LoadingTransaction isLoading={isLoading} />
      <div>
        <SavingCryptoAssets reload={isLoading} />
        <BorrowCryptoAssets reload={isLoading} />
      </div>
      <Overview/>
    </PageWrap>
  )
}

export default SavingAndBorrowing
