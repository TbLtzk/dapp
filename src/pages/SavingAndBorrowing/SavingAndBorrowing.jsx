import React, { useState } from 'react'
import PageWrap from 'components/Base/PageWrap'
import Button from 'components/Base/Buttons/Button'
import Overview from './components/Overview'
import SavingCryptoAssets from './components/SavingCryptoAssets'
import BorrowCryptoAssets from './components/BorrowCryptoAssets'

import { useDispatch, useSelector } from 'react-redux'
import { setCreateQBTCVault } from 'store/borrowing-core/action-creators'
import { loadTypeSelector } from 'store/user-inf/selectors'
import { LOAD_TYPES } from 'constants/statuses'
import { addQBTCToken, addQUSDToken } from 'contracts/helpers/borrowing-core-helper'

function SavingAndBorrowing () {
  const dispatch = useDispatch()
  const loadType = useSelector(loadTypeSelector)

  const [qbtcToken, setQbtcToken] = useState(localStorage.getItem('qbtcTokenAdded'))
  const [qusdToken, setQusdToken] = useState(localStorage.getItem('qusdTokenAdded'))

  function createVault () {
    dispatch(setCreateQBTCVault())
  }

  const buttons = (
        <>
            {loadType === LOAD_TYPES.loaded && (
                <>
                    {!qusdToken && (
                        <Button
                            title="Add QUSD token"
                            margin="0 20px 0 0"
                            handleButton={() => addQUSDToken(setQusdToken)}
                        />
                    )}
                    {!qbtcToken && (
                        <Button
                            title="Add QBTC token"
                            margin="0 20px 0 0"
                            handleButton={() => addQBTCToken(setQbtcToken)}
                        />
                    )}
                </>
            )}
            <Button icon="plus-circle-outline" handleButton={createVault} title="Create QBTC Vault" />
        </>
  )
  return (
        <PageWrap wrapContentClasses="wrap-content__column-2-1" headerTitle="Saving & Borrowing" headerExtra={buttons}>
            <div>
                <SavingCryptoAssets />
                <BorrowCryptoAssets />
            </div>
            <Overview />
        </PageWrap>
  )
}

export default SavingAndBorrowing
