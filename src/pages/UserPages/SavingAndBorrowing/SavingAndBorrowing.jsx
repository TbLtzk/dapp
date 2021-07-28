import React, { useState } from 'react'
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

  const createVault = async (collateral) => {
    try {
      setIsLoading(true)
      const contract = new BorrowingCoreQUSD(contractsToAddresses.BorrowingCoreQUSD)
      await contract.createVault(address, collateral)
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

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
