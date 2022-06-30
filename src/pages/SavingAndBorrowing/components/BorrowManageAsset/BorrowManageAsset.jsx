import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isEmpty } from 'lodash';
import Button from 'ui/Button';

import LoadingSpinner from 'components/Base/LoadingSpinner';
import ModalWindow from 'components/Base/ModalWindow';
import { WrapSpinner } from 'pages/styles';

import BorrowForm from './components/BorrowForm';
import BorrowInfo from './components/BorrowInfo';
import DepositForm from './components/DepositForm';
import RepayForm from './components/RepayForm';
import WithdrawForm from './components/WithdrawForm';

import { getBorrowAllowance, getBorrowVaultInfo, setBorrowVaultInfo } from 'store/borrow-assets/action-creators';
import { borrowVaultInfoSelector } from 'store/borrow-assets/selectors';

import { borrowTypes } from 'constants/borrowTypes';

function BorrowManageAsset ({ vault }) {
  const dispatch = useDispatch();
  const borrowVaultInfo = useSelector(borrowVaultInfoSelector);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    dispatch(setBorrowVaultInfo({}));
    dispatch(getBorrowAllowance(borrowTypes.deposit));
    dispatch(getBorrowAllowance(borrowTypes.repay));
    dispatch(getBorrowVaultInfo(vault?.vaultNum));
  };

  const modalContent = isEmpty(borrowVaultInfo)
    ? (
      <WrapSpinner>
        <LoadingSpinner />
      </WrapSpinner>
    )
    : (
      <>
        <BorrowInfo />
        <BorrowForm vaultNum={vault?.vaultNum} />
        <RepayForm vaultNum={vault?.vaultNum} />
        <DepositForm vaultNum={vault?.vaultNum} />
        <WithdrawForm vaultNum={vault?.vaultNum} />
      </>
    );

  return (
    <>
      <Button
        compact
        look="ghost"
        disabled={vault.isLiquidated}
        onClick={handleOpenModal}
      >
        <span>Manage</span>
        <i className="mdi mdi-arrow-top-right" />
      </Button>

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
