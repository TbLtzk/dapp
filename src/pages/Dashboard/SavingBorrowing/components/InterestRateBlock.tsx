import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAnimateNumber, useInterval } from '@q-dev/react-hooks';
import styled from 'styled-components';
import { BorrowAssetsRateAndFee, StablecoinAsset } from 'typings/defi';

import Button from 'components/Button';

import { useBorrowing } from 'store/borrowing/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { getBorrowingCompoundRateLastUpdate } from 'contracts/helpers/borrowing-core';

import { formatDate, formatDateRelative } from 'utils/date';

interface Props {
  rate: BorrowAssetsRateAndFee;
  stablecoinAsset: StablecoinAsset;
}

const StyledWrapper = styled.div`
  display: grid;
  gap: 16px;
  padding-right: 24px;

  .interest-rate-refresh {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .interest-rate-refresh-icon {
    font-size: 20px;
  }
`;

function InterestRateBlock ({ rate, stablecoinAsset }: Props) {
  const { t, i18n } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { updateBorrowingCompoundRate } = useBorrowing();

  const interestRateRef = useAnimateNumber(rate.borrowingFee, ' %');

  const [timeSinceOutstandingDebt, setTimeSinceOutstandingDebt] = useState<Date | null>(null);
  const [debtRefreshLoading, setDebtRefreshLoading] = useState(false);

  useInterval(() => {
    getBorrowingCompoundRateLastUpdate(rate.asset, stablecoinAsset).then(setTimeSinceOutstandingDebt);
  }, 50000, { disabled: debtRefreshLoading, immediate: true });

  const handleRefreshDebt = async () => {
    setDebtRefreshLoading(true);
    await submitTransaction({
      successMessage: t('TIME_SINCE_LAST_REFRESH_TX'),
      isClosedModal: true,
      submitFn: () => updateBorrowingCompoundRate(rate.asset, stablecoinAsset)
    });

    const updatedTime = await getBorrowingCompoundRateLastUpdate(rate.asset, stablecoinAsset);
    setTimeSinceOutstandingDebt(updatedTime);
    setDebtRefreshLoading(false);
  };

  return (
    <StyledWrapper className="block">
      <p className="text-h3">{stablecoinAsset} - {rate.asset}</p>

      <div>
        <p ref={interestRateRef} className="text-xl font-semibold" />
        <p className="text-md color-secondary">{t('BORROWING_FEE')}</p>
      </div>

      <div className="interest-rate-refresh">
        <div>
          <p
            className="text-xl font-semibold"
            title={formatDate(timeSinceOutstandingDebt, i18n.language)}
          >
            {formatDateRelative(timeSinceOutstandingDebt, i18n.language)}
          </p>
          <p className="text-md color-secondary">{t('OUTSTANDING_DEBT_REFRESHED')}</p>
        </div>
        <Button
          icon
          loading={debtRefreshLoading}
          onClick={handleRefreshDebt}
        >
          {!debtRefreshLoading && <i className="mdi mdi-cached interest-rate-refresh-icon" />}
        </Button>
      </div>
    </StyledWrapper>
  );
}

export default InterestRateBlock;
