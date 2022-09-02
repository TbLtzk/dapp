import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { media } from 'styles/media';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Button from 'ui/Button';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import { useBorrowingCore } from 'store/borrowing-core/hooks';
import { useSavingAssets } from 'store/saving-assets/hooks';
import { useSystemBalance } from 'store/system-balance/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { getStableCoinInstance } from 'contracts/contract-instance';
import { getSavingCompoundRateLastUpdate } from 'contracts/helpers/borrowing-core';

import { formatDate, formatDateRelative } from 'utils/date';

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;

  ${media.lessThan('medium')} {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .balance-overview-refresh {
    display: flex;
    gap: 16px;
    align-items: center;

    ${media.lessThan('medium')} {
      justify-content: space-between;
    }
  }

  .balance-overview-refresh-icon {
    font-size: 20px;
  }
`;

function BalanceOverview () {
  const { t, i18n } = useTranslation();
  const { submitTransaction } = useTransaction();

  const { updateSavingCompoundRate } = useSavingAssets();
  const { savingRate, getSavingRate } = useBorrowingCore();
  const {
    systemBalance,
    stableCoinTotalSupply,
    getSystemBalance,
    getStableCoinTotalSupply,
  } = useSystemBalance();

  const [stableCoinAddress, setStableCoinAddress] = useState('…');
  const [timeSinceRefreshBalance, setTimeSinceRefreshBalance] = useState<Date | null>(null);
  const [loadingTimeSinceRefreshBalance, setLoadingTimeSinceRefreshBalance] = useState(false);

  const systemBalanceRef = useAnimateNumber(systemBalance, ' QUSD');
  const totalSupplyRef = useAnimateNumber(stableCoinTotalSupply, ' QUSD');
  const savingRateRef = useAnimateNumber(savingRate, ' %');

  useEffect(() => {
    getStableCoinInstance().then((contract) => setStableCoinAddress(contract.address));

    getSavingRate();
    getSystemBalance();
    getStableCoinTotalSupply();
    getSavingCompoundRateLastUpdate().then(setTimeSinceRefreshBalance);

    return () => setStableCoinAddress('');
  }, []);

  useInterval(() => {
    getSavingCompoundRateLastUpdate().then(setTimeSinceRefreshBalance);
  }, 50000, loadingTimeSinceRefreshBalance);

  const handleRefreshBalance = async () => {
    setLoadingTimeSinceRefreshBalance(true);

    await submitTransaction({
      hideLoading: true,
      successMessage: t('SAVING_TIME_SINSE_REFRESH_SUCCESS'),
      submitFn: updateSavingCompoundRate,
    });

    getSavingCompoundRateLastUpdate().then(setTimeSinceRefreshBalance);
    setLoadingTimeSinceRefreshBalance(false);
    getSystemBalance();
  };

  return (
    <StyledWrapper className="block">
      <div>
        <ExplorerAddress
          short
          semibold
          className="text-xl"
          address={stableCoinAddress}
        />
        <p className="text-md color-secondary">{t('QUSD_CONTRACT')}</p>
      </div>

      <div>
        <p ref={totalSupplyRef} className="text-xl font-semibold">0 QUSD</p>
        <p className="text-md color-secondary">{t('QUSD_TOTAL_SUPPLY')}</p>
      </div>

      <div>
        <p ref={savingRateRef} className="text-xl font-semibold">0 %</p>
        <p className="text-md color-secondary">{t('QUSD_SAVING_REWARD')}</p>
      </div>

      <div>
        <p ref={systemBalanceRef} className="text-xl font-semibold">0 QUSD</p>
        <p className="text-md color-secondary">{t('QUSD_SYSTEM_BALANCE')}</p>
      </div>

      <div className="balance-overview-refresh">
        <div>
          <p
            className="text-xl font-semibold"
            title={formatDate(timeSinceRefreshBalance, i18n.language)}
          >
            {formatDateRelative(timeSinceRefreshBalance, i18n.language)}
          </p>
          <p className="text-md color-secondary">{t('QUSD_SAVING_BALANCE_REFRESHED')}</p>
        </div>
        <Button
          icon
          loading={loadingTimeSinceRefreshBalance}
          onClick={handleRefreshBalance}
        >
          {!loadingTimeSinceRefreshBalance && <i className="mdi mdi-cached balance-overview-refresh-icon" />}
        </Button>
      </div>
    </StyledWrapper>
  );
}

export default BalanceOverview;
