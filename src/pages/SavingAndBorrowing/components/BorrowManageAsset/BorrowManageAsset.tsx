import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { isEmpty } from 'lodash';
import { Asset, VaultData, VaultWithFee } from 'typings/defi';

import { SpinnerWrapper } from 'pages/SavingAndBorrowing/styles';
import Button from 'ui/Button';
import Modal from 'ui/Modal';
import Spinner from 'ui/Spinner';

import BorrowForm from './components/BorrowForm';
import BorrowInfo from './components/BorrowInfo';
import DepositForm from './components/DepositForm';
import RepayForm from './components/RepayForm';
import WithdrawForm from './components/WithdrawForm';
import { BorrowManageWrapper } from './styles';

import { getBorrowAllowance, getBorrowVault, getBorrowVaultSuccess } from 'store/borrow-assets/actions';
import { borrowVaultErrorSelector, borrowVaultSelector } from 'store/borrow-assets/selectors';

interface Props {
  vault: VaultWithFee;
}

function BorrowManageAsset ({ vault }: Props) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const borrowVault = useSelector(borrowVaultSelector);
  const borrowVaultError = useSelector(borrowVaultErrorSelector);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    dispatch(getBorrowVaultSuccess({} as VaultData));
    dispatch(getBorrowAllowance('repay', vault.colKey as Asset));
    dispatch(getBorrowAllowance('deposit', vault.colKey as Asset));
    dispatch(getBorrowVault(vault.vaultNum));
  };

  const vaultModal = useMemo(() => {
    if (borrowVaultError) {
      return <div>Error while loading vault</div>;
    }
    if (isEmpty(borrowVault)) {
      return (
        <SpinnerWrapper>
          <Spinner size={96} thickness={4} />
        </SpinnerWrapper>
      );
    }
    return (
      <BorrowManageWrapper>
        <BorrowInfo />
        <div className="borrow-forms">
          <BorrowForm vault={vault} />
          <RepayForm vault={vault} />
          <DepositForm vault={vault} />
          <WithdrawForm vault={vault} />
        </div>
      </BorrowManageWrapper>
    );
  }, [borrowVaultError, borrowVault, vault]);

  return (
    <>
      <Button
        compact
        look="ghost"
        disabled={vault.isLiquidated}
        onClick={handleOpenModal}
      >
        <span>{t('MANAGE')}</span>
        <i className="mdi mdi-arrow-top-right" />
      </Button>

      <Modal
        open={isModalOpen}
        title={t('BORROWING_QUSD')}
        width={560}
        onClose={handleCloseModal}
      >
        {vaultModal}
      </Modal>
    </>
  );
}

export default BorrowManageAsset;
