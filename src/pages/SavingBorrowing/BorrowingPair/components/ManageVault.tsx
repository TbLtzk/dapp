import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import styled from 'styled-components';
import { Asset, VaultWithId } from 'typings/defi';

import Tabs from 'components/Tabs';

import BorrowForm from './BorrowForm';
import DepositForm from './DepositForm';
import RepayForm from './RepayForm';
import WithdrawForm from './WithdrawForm';

import { useBorrowAssets } from 'store/borrow-assets/hooks';

const StyledWrapper = styled.div`
  .manage-vault-content {
    margin-top: 20px;
  }
`;

interface Props {
  vault: VaultWithId;
}

function ManageVault ({ vault }: Props) {
  const { t } = useTranslation();
  const { hash, pathname } = useLocation();

  const { getBorrowingVault, getBorrowingAllowance } = useBorrowAssets();

  useEffect(() => {
    getBorrowingAllowance({
      borrowType: 'repay',
      asset: vault.colKey as Asset
    });
    getBorrowingAllowance({
      borrowType: 'deposit',
      asset: vault.colKey as Asset,
    });
    getBorrowingVault(vault.id);
  }, []);

  const tabs = [
    {
      id: 'borrowing-deposit',
      label: t('DEPOSIT'),
      link: `${pathname}#deposit`
    },
    {
      id: 'borrowing-borrow',
      label: t('BORROW'),
      link: `${pathname}#borrow`
    },
    {
      id: 'borrowing-repay',
      label: t('REPAY'),
      link: `${pathname}#repay`
    },
    {
      id: 'borrowing-withdraw',
      label: t('WITHDRAW'),
      link: `${pathname}#withdraw`
    },
  ];

  const tabContent = () => {
    switch (hash) {
      case '#borrow':
        return <BorrowForm vault={vault} />;
      case '#repay':
        return <RepayForm vault={vault} />;
      case '#withdraw':
        return <WithdrawForm vault={vault} />;
      case '#deposit':
      default:
        return <DepositForm vault={vault} />;
    }
  };

  return (
    <StyledWrapper>
      <Tabs noAnimation tabs={tabs} />
      <div className="manage-vault-content">{tabContent()}</div>
    </StyledWrapper>
  );
}

export default ManageVault;
