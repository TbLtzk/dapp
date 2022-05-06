import React, { useState } from 'react'
import { isEmpty } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import Button from 'components/Base/Buttons/Button'
import ModalWindow from 'components/Base/ModalWindow'
import LoadingSpinner from 'components/Base/LoadingSpinner'
import BorrowInfo from './components/BorrowInfo'
import { borrowVaultInfoSelector } from 'store/borrow-assets/selectors'
import { getBorrowAllowance, getBorrowVaultInfo, setBorrowVaultInfo } from 'store/borrow-assets/action-creators'
import { WrapSpinner } from 'pages/styles'
import BorrowAsset from './components/BorrowAsset'

export const TYPE = {
  deposit: 'deposit',
  repay: 'repay'
}

function BorrowManageAsset ({ vault }) {
  const vaultData = {
    type: 'borrow',
    collateral: vault.colKey,
    borrow: 'QUSD',
    vault
  }

  const dispatch = useDispatch()
  const borrowVaultInfo = useSelector(borrowVaultInfoSelector)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
    dispatch(setBorrowVaultInfo({}))
    dispatch(getBorrowAllowance(TYPE.deposit))
    dispatch(getBorrowAllowance(TYPE.repay))
    dispatch(getBorrowVaultInfo(vaultData?.vault?.vaultNum))
  }

  const modalContent = isEmpty(borrowVaultInfo)
    ? (
        <WrapSpinner>
            <LoadingSpinner />
        </WrapSpinner>
      )
    : (
        <>
            <BorrowInfo {...borrowVaultInfo} />
            <BorrowAsset {...borrowVaultInfo} vaultData={vaultData} />
        </>
      )

  return (
        <>
            <Button
                isIconPositionRight
                icon="arrow-top-right"
                title="Manage"
                disabled={vault.isLiquidated}
                type="transparent"
                handleButton={handleOpenModal}
            />

            <ModalWindow
                show={isModalOpen}
                onHide={handleCloseModal}
                modalTitle="Borrowing QUSD"
                content={modalContent}
            />
        </>
  )
}

export default BorrowManageAsset
