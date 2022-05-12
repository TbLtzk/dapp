import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isEmpty } from 'lodash';

import Button from 'components/Base/Button';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import ModalWindow from 'components/Base/ModalWindow';
import { WrapSpinner } from 'pages/styles';

import BorrowAsset from './components/BorrowAsset';
import BorrowInfo from './components/BorrowInfo';

import { getBorrowAllowance, getBorrowVaultInfo, setBorrowVaultInfo } from 'store/borrow-assets/action-creators';
import { borrowVaultInfoSelector } from 'store/borrow-assets/selectors';

export const TYPE = {
  deposit: 'deposit',
  repay: 'repay'
};

function BorrowManageAsset ({ vault }) {
  const vaultData = {
    type: 'borrow',
    collateral: vault.colKey,
    borrow: 'QUSD',
    vault
  };

  const dispatch = useDispatch();
  const borrowVaultInfo = useSelector(borrowVaultInfoSelector);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    dispatch(setBorrowVaultInfo({}));
    dispatch(getBorrowAllowance(TYPE.deposit));
    dispatch(getBorrowAllowance(TYPE.repay));
    dispatch(getBorrowVaultInfo(vaultData?.vault?.vaultNum));
  };

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
    );

  return (
    <>
      <Button
        iconRight
        icon="arrow-top-right"
        title="Manage"
        disabled={vault.isLiquidated}
        look="transparent"
        onClick={handleOpenModal}
      />

      <ModalWindow
        show={isModalOpen}
        modalTitle="Borrowing QUSD"
        content={modalContent}
        onHide={handleCloseModal}
      />
    </>
  );
}

export default BorrowManageAsset;
