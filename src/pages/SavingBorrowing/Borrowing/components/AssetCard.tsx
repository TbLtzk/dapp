import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Icon } from '@q-dev/q-ui-kit';
import { useAnimateNumber, useInterval } from '@q-dev/react-hooks';
import styled from 'styled-components';
import { InterestRate } from 'typings/defi';

import Button from 'components/Button';
import AssetPairLogos from 'pages/SavingBorrowing/components/AssetPairLogos';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useBorrowing, useInterestRates } from 'store/borrowing/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { getBorrowingCompoundRateLastUpdate } from 'contracts/helpers/borrowing-core';

import { formatDate, formatDateRelative } from 'utils/date';

const StyledLink = styled(Link)`
  padding: 0;
  transition: all 150ms ease-out;

  &:hover,
  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.blockBorderHover};
  }

  .asset-card-header {
    display: grid;
    padding: 24px 24px 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.blockDivider};
  }

  .asset-card-logos {
    margin-bottom: 4px;

    .asset-pair-logo::after {
      width: 32px;
      height: 32px;
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.block};
    }

    .asset-pair-logo-icon {
      width: 32px;
    }
  }

  .asset-card-main {
    display: grid;
    padding: 16px 24px 24px;
    gap: 12px;
  }

  .asset-card-block {
    display: grid;
    gap: 4px;
  }

  .asset-card-debt {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

function AssetCard ({ rate }: { rate: InterestRate }) {
  const { t, i18n } = useTranslation();
  const { collaterals } = useNetworkConfig();

  const { submitTransaction } = useTransaction();
  const { updateBorrowingCompoundRate } = useBorrowing();
  const { getInterestRates } = useInterestRates();

  const interestRateRef = useAnimateNumber(rate.borrowingFee, ' %');
  const debtRef = useAnimateNumber(rate.outstandingDebt, '');

  const [timeSinceOutstandingDebt, setTimeSinceOutstandingDebt] = useState<Date | null>(null);
  const [debtRefreshLoading, setDebtRefreshLoading] = useState(false);

  useEffect(() => {
    getBorrowingCompoundRateLastUpdate(rate.asset).then(setTimeSinceOutstandingDebt);
  }, []);

  useInterval(() => {
    getBorrowingCompoundRateLastUpdate(rate.asset).then(setTimeSinceOutstandingDebt);
  }, 50000, debtRefreshLoading);

  const handleRefreshDebt = async () => {
    setDebtRefreshLoading(true);
    await submitTransaction({
      successMessage: t('TIME_SINCE_LAST_REFRESH_SUCCESS'),
      hideLoading: true,
      submitFn: () => updateBorrowingCompoundRate(rate.asset)
    });

    const updatedTime = await getBorrowingCompoundRateLastUpdate(rate.asset);
    setTimeSinceOutstandingDebt(updatedTime);

    getInterestRates(collaterals);
    setDebtRefreshLoading(false);
  };

  return (
    <StyledLink
      to={{
        pathname: `/saving-borrowing/borrowing/${rate.asset}-QUSD`,
        state: { from: 'list' },
      }}
      className="block"
    >
      <div className="asset-card-header">
        <AssetPairLogos
          collateral={rate.asset}
          borrowing="QUSD"
          className="asset-card-logos"
        />
        <p className="text-h3">{rate.asset} → QUSD</p>
      </div>

      <div className="asset-card-main">
        <div className="asset-card-block">
          <p className="text-md color-secondary">{t('BORROWING_FEE')}</p>
          <p ref={interestRateRef} className="text-xl font-semibold" />
        </div>

        <div className="asset-card-block">
          <p className="text-md color-secondary">{t('OUTSTANDING_DEBT_ASSET', { asset: 'QUSD' })}</p>
          <div className="asset-card-debt">
            <div>
              <p ref={debtRef} className="text-xl font-semibold">0</p>
              <p
                className="text-sm font-light"
                title={formatDate(timeSinceOutstandingDebt, i18n.language)}
              >
                {t('REFRESHED_TIME', { time: formatDateRelative(timeSinceOutstandingDebt, i18n.language) })}
              </p>
            </div>

            <Button
              icon
              look="ghost"
              loading={debtRefreshLoading}
              onClick={e => {
                e.preventDefault();
                handleRefreshDebt();
              }}
            >
              {!debtRefreshLoading && <Icon name="refresh" />}
            </Button>
          </div>
        </div>
      </div>
    </StyledLink>
  );
}

export default AssetCard;
