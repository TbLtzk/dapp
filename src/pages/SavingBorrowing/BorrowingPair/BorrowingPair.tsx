import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps, useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { Icon, media } from '@q-dev/q-ui-kit';
import styled from 'styled-components';
import { Asset } from 'typings/defi';

import Button from 'components/Button';

import useNetworkConfig from 'hooks/useNetworkConfig';

import AssetPairLogos from '../components/AssetPairLogos';

import BorrowingBalance from './components/BorrowingBalance';
import BorrowingFeeViewer from './components/BorrowingFeeViewer';
import CollateralBalance from './components/CollateralBalance';
import DebtViewer from './components/DebtViewer';
import VaultsList from './components/VaultsList';

import { useBorrowing, useBorrowingVaults } from 'store/borrowing/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { RoutePaths } from 'constants/routes';

const StyledWrapper = styled.div`
  .borrowing-pair-header {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .borrowing-pair-assets {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .borrowing-pair-overview {
    margin-top: 24px;
    margin-bottom: 40px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;

    ${media.lessThan('large')} {
      grid-template-columns: 1fr 1fr;
    }

    ${media.lessThan('medium')} {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
`;

function BorrowingPair ({ match }: RouteComponentProps<{
  collateral: Asset;
  borrow: 'QUSD';
}>) {
  const history = useHistory();
  const { t } = useTranslation();
  const { collaterals } = useNetworkConfig();

  const { collateral, borrow } = match.params;

  const { submitTransaction } = useTransaction();
  const { getBorrowingVaults, createVault } = useBorrowingVaults();
  const { getBorrowingFee, getCollateralBalance } = useBorrowing();

  useEffect(() => {
    getBorrowingVaults();
    getBorrowingFee(collateral);
    getCollateralBalance(collateral);
  }, []);

  useEffect(() => {
    if (!collaterals.includes(collateral) || borrow !== 'QUSD') {
      history.replace('/not-found');
    }

    document.title = `${collateral} - ${borrow} ${t('BORROWING')} | Your HQ`;
  }, [collateral, borrow]);

  return (
    <StyledWrapper>
      <Link to={RoutePaths.borrowing}>
        <Button
          block
          compact
          alwaysEnabled
          look="ghost"
        >
          <Icon name="arrow-left" />
          <span>{t('SAVING_BORROWING')}</span>
        </Button>
      </Link>

      <div className="borrowing-pair-header">
        <div className="borrowing-pair-assets">
          <AssetPairLogos collateral={collateral} borrowing={borrow} />
          <h1 className="text-h2">{collateral} → {borrow}</h1>
        </div>

        <Button
          onClick={() => submitTransaction({
            successMessage: t('CREATE_ASSET_VAULT_TX'),
            submitFn: () => createVault(collateral),
          })}
        >
          <Icon name="add" />
          <span>{t('NEW_VAULT')}</span>
        </Button>
      </div>

      <div className="borrowing-pair-overview">
        <BorrowingFeeViewer asset={collateral} />
        <CollateralBalance asset={collateral} />
        <BorrowingBalance />
        <DebtViewer asset={collateral} />
      </div>

      <VaultsList asset={collateral} />
    </StyledWrapper>
  );
}

export default BorrowingPair;
