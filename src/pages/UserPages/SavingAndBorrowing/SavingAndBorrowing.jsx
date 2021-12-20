import React, { useEffect } from 'react'
import PageWrap from 'components/Base/PageWrap'
import Button from 'components/Base/Buttons/Button'
import Overview from './components/Overview'
import SavingCryptoAssets from './components/SavingCryptoAssets'
import BorrowCryptoAssets from './components/BorrowCryptoAssets'

import { useDispatch, useSelector } from 'react-redux'
import { setAddCoinsToMetamask, setCreateQBTCVault } from 'store/borrowing-core/action-creators'
import { shouldAddCoinsSelector } from 'store/borrowing-core/selectors'

function SavingAndBorrowing () {
  const dispatch = useDispatch()
  const shouldAddCoins = useSelector(shouldAddCoinsSelector)

  function createVault () {
    dispatch(setCreateQBTCVault())
  }

  useEffect(() => {
    if (shouldAddCoins) {
      dispatch(setAddCoinsToMetamask())
    }
  }, [])

  return (
        <PageWrap
            wrapContentClasses="wrap-content__column-2-1"
            headerTitle="Saving & Borrowing"
            headerExtra={<Button icon="plus-circle-outline" handleButton={createVault} title="Create QBTC Vault" />}
        >
            <div>
                <SavingCryptoAssets />
                <BorrowCryptoAssets />
            </div>
            <Overview />
        </PageWrap>
  )
}

export default SavingAndBorrowing
