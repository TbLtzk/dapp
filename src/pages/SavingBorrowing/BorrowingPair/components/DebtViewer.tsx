
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '@q-dev/q-ui-kit';
import { useAnimateNumber, useInterval } from '@q-dev/react-hooks';
import styled from 'styled-components';
import { Asset, StablecoinAsset } from 'typings/defi';

import Button from 'components/Button';

import { useBorrowing, useBorrowingVaults } from 'store/borrowing/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { getBorrowingCompoundRateLastUpdate } from 'contracts/helpers/borrowing-core';

import { formatDate, formatDateRelative } from 'utils/date';

interface Props {
  collateral: Asset;
  stablecoin: StablecoinAsset;
}

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

function DebtViewer ({ collateral, stablecoin }: Props) {
  const { t, i18n } = useTranslation();
  const { submitTransaction } = useTransaction();

  const { updateBorrowingCompoundRate } = useBorrowing();
  const { borrowingVaults, loadBorrowingVaults } = useBorrowingVaults(stablecoin);

  const assetVaults = borrowingVaults.filter(vault => vault.colKey === collateral);
  const outstandingDebt = assetVaults.reduce((acc, vault) => acc + Number(vault.outstandingDebt), 0);
  const outstandingDebtRef = useAnimateNumber(outstandingDebt, '');

  const [refreshTime, setRefreshTime] = useState<Date | null>(null);
  const [timeLoading, setTimeLoading] = useState(false);

  useInterval(() => {
    getBorrowingCompoundRateLastUpdate(collateral, stablecoin).then(setRefreshTime);
  }, 50000, { disabled: timeLoading, immediate: true });

  const handleRefreshDebt = async () => {
    setTimeLoading(true);
    await submitTransaction({
      successMessage: t('TIME_SINCE_LAST_REFRESH_TX'),
      isClosedModal: true,
      submitFn: () => updateBorrowingCompoundRate(collateral, stablecoin)
    });

    const updatedTime = await getBorrowingCompoundRateLastUpdate(collateral, stablecoin);
    setRefreshTime(updatedTime);

    loadBorrowingVaults();
    setTimeLoading(false);
  };

  return (
    <StyledWrapper className="block">
      <div className="block__header">
        <h2 className="text-lg">{t('ASSET_DEBT', { asset: stablecoin })}</h2>
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
