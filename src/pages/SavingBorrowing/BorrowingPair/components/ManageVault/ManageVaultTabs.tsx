import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import styled from 'styled-components';
import { StablecoinAsset, VaultWithId } from 'typings/defi';

import Tabs from 'components/Tabs';

import BorrowForm from './BorrowForm';
import DepositForm from './DepositForm';
import RepayForm from './RepayForm';
import WithdrawForm from './WithdrawForm';

const StyledWrapper = styled.div`
  .manage-vault-tabs__content {
    margin-top: 20px;
  }
`;

interface Props {
  vault: VaultWithId;
  stablecoin: StablecoinAsset;
}

function ManageVaultTabs ({ vault, stablecoin }: Props) {
  const { t } = useTranslation();
  const { hash, pathname } = useLocation();

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
        return <BorrowForm vault={vault} stablecoin={stablecoin} />;
      case '#repay':
        return <RepayForm vault={vault} stablecoin={stablecoin} />;
      case '#withdraw':
        return <WithdrawForm vault={vault} stablecoin={stablecoin} />;
      case '#deposit':
      default:
        return <DepositForm vault={vault} stablecoin={stablecoin} />;
    }
  };

  return (
    <StyledWrapper>
      <Tabs noAnimation tabs={tabs} />
      <div className="manage-vault-tabs__content">{tabContent()}</div>
    </StyledWrapper>
  );
}

export default ManageVaultTabs;
