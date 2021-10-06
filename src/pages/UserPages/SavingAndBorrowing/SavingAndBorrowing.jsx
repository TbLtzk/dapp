import React, { useEffect } from 'react'
import PageWrap from 'components/Base/PageWrap'
import Button from 'components/Base/Buttons/Button'
import Overview from './components/Overview'
import SavingCryptoAssets from './components/SavingCryptoAssets'
import BorrowCryptoAssets from './components/BorrowCryptoAssets'

import { useDispatch, useSelector } from 'react-redux'
import { setAddCoinsToMetamask, setCreateQBTCVault } from 'store/actions/action-creaters/borrowing-core'
import { shouldAddCoins } from 'store/selectors/borrowing-core'

function SavingAndBorrowing () {
  const dispatch = useDispatch()
  const shouldAddCoinsToMetamask = useSelector(shouldAddCoins)

  const createVault = () => {
    dispatch(setCreateQBTCVault())
  }

  useEffect(() => {
    if (shouldAddCoinsToMetamask) {
      dispatch(setAddCoinsToMetamask())
    }
  }, [])

  return (
        <PageWrap
            wrapContentClasses="wrap-content__column-2-1"
            headerTitle="Saving and Borrowing"
            headerExtra={<Button icon="plus-circle-outline" handleButton={createVault} title="Create QBTC vault" />}
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
