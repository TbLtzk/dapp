
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '@q-dev/q-ui-kit';
import { useAnimateNumber, useInterval } from '@q-dev/react-hooks';
import styled from 'styled-components';
import { Asset } from 'typings/defi';

import Button from 'components/Button';

import { useBorrowing, useBorrowingVaults } from 'store/borrowing/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { getBorrowingCompoundRateLastUpdate } from 'contracts/helpers/borrowing-core';

import { formatDate, formatDateRelative } from 'utils/date';

const StyledWrapper = styled.div`
  padding: 24px 24px 16px 24px;
  display: grid;
  gap: 4px;

  .debt-refresh {
    margin-top: 12px;
  }

  .debt-refresh-btn {
    margin: -8px -8px 0 0;
    padding: 6px;
    height: 32px;
  }
`;

function DebtViewer ({ asset }: { asset: Asset }) {
  const { t, i18n } = useTranslation();
  const { submitTransaction } = useTransaction();

  const { updateBorrowingCompoundRate } = useBorrowing();
  const { borrowingVaults, getBorrowingVaults } = useBorrowingVaults();

  const assetVaults = borrowingVaults.filter(vault => vault.colKey === asset);
  const outstandingDebt = assetVaults.reduce((acc, vault) => acc + Number(vault.outstandingDebt), 0);
  const outstandingDebtRef = useAnimateNumber(outstandingDebt, '');

  const [refreshTime, setRefreshTime] = useState<Date | null>(null);
  const [timeLoading, setTimeLoading] = useState(false);

  useEffect(() => {
    getBorrowingCompoundRateLastUpdate(asset).then(setRefreshTime);
  }, []);

  useInterval(() => {
    getBorrowingCompoundRateLastUpdate(asset).then(setRefreshTime);
  }, 50000, timeLoading);

  const handleRefreshDebt = async () => {
    setTimeLoading(true);
    await submitTransaction({
      successMessage: t('TIME_SINCE_LAST_REFRESH_SUCCESS'),
      hideLoading: true,
      submitFn: () => updateBorrowingCompoundRate(asset)
    });

    const updatedTime = await getBorrowingCompoundRateLastUpdate(asset);
    setRefreshTime(updatedTime);

    getBorrowingVaults();
    setTimeLoading(false);
  };

  return (
    <StyledWrapper className="block">
      <div className="block__header">
        <h2 className="text-lg">{t('ASSET_DEBT', { asset: 'QUSD' })}</h2>
        <Button
          icon
          look="ghost"
          className="debt-refresh-btn"
          loading={timeLoading}
          onClick={handleRefreshDebt}
        >
          {!timeLoading && <Icon name="refresh" />}
        </Button>
      </div>
      <p ref={outstandingDebtRef} className="text-xl font-semibold">0</p>
      <p
        className="debt-refresh text-sm font-light"
        title={formatDate(refreshTime, i18n.language)}
      >
        {t('REFRESHED_TIME', { time: formatDateRelative(refreshTime, i18n.language) })}
      </p>
    </StyledWrapper>
  );
}

export default DebtViewer;
