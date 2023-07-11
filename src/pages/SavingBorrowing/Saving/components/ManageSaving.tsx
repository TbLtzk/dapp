import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import styled from 'styled-components';
import { SavingAsset } from 'typings/defi';

import Tabs from 'components/Tabs';

import DepositForm from './DepositForm';
import WithdrawForm from './WithdrawForm';

import { useSaving } from 'store/saving/hooks';

const StyledWrapper = styled.div`
  .manage-saving-content {
    margin-top: 16px;
  }
`;

interface Props {
  asset: SavingAsset;
}

function ManageSaving ({ asset }: Props) {
  const { t } = useTranslation();
  const { hash, pathname } = useLocation();

  const {
    loadSavingAllowance,
    loadSavingBalanceDetails,
    loadSavingAvailableToDeposit
  } = useSaving(asset.assetName);

  useEffect(() => {
    loadSavingAllowance();
    loadSavingBalanceDetails();
    loadSavingAvailableToDeposit();
  }, []);

  const tabs = [
    {
      id: 'saving-deposit',
      label: t('DEPOSIT'),
      link: `${pathname}#deposit`
    },
    {
      id: 'saving-withdraw',
      label: t('WITHDRAW'),
      link: `${pathname}#withdraw`
    },
  ];

  return (
    <StyledWrapper>
      <Tabs noAnimation tabs={tabs} />
      <div className="manage-saving-content">
        {hash === '#deposit'
          ? <DepositForm asset={asset} />
          : <WithdrawForm asset={asset.assetName} />
        }
      </div>
    </StyledWrapper>
  );
}

export default ManageSaving;
