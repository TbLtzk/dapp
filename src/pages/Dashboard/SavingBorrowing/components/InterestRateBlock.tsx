import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { BorrowAssetsRateAndFee } from 'typings/defi';

import Button from 'ui/Button';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import { userAddressMetamask } from 'store/user-inf/selectors';

import { getTimeSinceOutstandingDebt, refreshTimeSinceOutstandingDebt } from 'contracts/helpers/borrowing-core';

import { formatDate, formatDateRelative } from 'utils/date';

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

function InterestRateBlock ({ rate }: { rate: BorrowAssetsRateAndFee }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);

  const interestRateRef = useAnimateNumber(rate.borrowingFee, ' %');

  const [timeSinceOutstandingDebt, setTimeSinceOutstandingDebt] = useState<Date | null>(null);
  const [debtRefreshLoading, setDebtRefreshLoading] = useState(false);

  useEffect(() => {
    getTimeSinceOutstandingDebt(rate.asset).then(setTimeSinceOutstandingDebt);
  }, []);

  useInterval(() => {
    getTimeSinceOutstandingDebt(rate.asset).then(setTimeSinceOutstandingDebt);
  }, 50000, debtRefreshLoading);

  const handleRefreshDebt = async () => {
    setDebtRefreshLoading(true);
    await refreshTimeSinceOutstandingDebt({
      userAddress,
      dispatch,
      asset: rate.asset,
      label: t('TIME_SINCE_LAST_REFRESH_SUCCESS')
    });

    const updatedTime = await getTimeSinceOutstandingDebt(rate.asset);
    setTimeSinceOutstandingDebt(updatedTime);
    setDebtRefreshLoading(false);
  };

  return (
    <StyledWrapper className="block">
      <p className="text-h3">QUSD - {rate.asset}</p>

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
