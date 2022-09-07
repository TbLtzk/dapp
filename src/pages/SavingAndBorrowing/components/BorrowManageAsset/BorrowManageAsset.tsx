import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { isEmpty } from 'lodash';
import { Asset, VaultWithFee } from 'typings/defi';

import Button from 'components/Button';
import { SpinnerWrapper } from 'pages/SavingAndBorrowing/styles';
import Modal from 'ui/Modal';
import Spinner from 'ui/Spinner';

import BorrowForm from './components/BorrowForm';
import BorrowInfo from './components/BorrowInfo';
import DepositForm from './components/DepositForm';
import RepayForm from './components/RepayForm';
import WithdrawForm from './components/WithdrawForm';
import { BorrowManageWrapper } from './styles';

import { useBorrowAssets } from 'store/borrow-assets/hooks';

interface Props {
  vault: VaultWithFee;
}

function BorrowManageAsset ({ vault }: Props) {
  const { t } = useTranslation();
  const {
    borrowVault,
    borrowVaultError,
    getBorrowingVault,
    getBorrowingAllowance,

  } = useBorrowAssets();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    getBorrowingAllowance({
      borrowType: 'repay',
      asset: vault.colKey as Asset
    });
    getBorrowingAllowance({
      borrowType: 'deposit',
      asset: vault.colKey as Asset,
    });
    getBorrowingVault(vault.vaultNum);
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
