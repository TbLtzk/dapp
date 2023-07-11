import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { media } from '@q-dev/q-ui-kit';
import { useAnimateNumber, useInterval } from '@q-dev/react-hooks';
import styled from 'styled-components';
import { StablecoinAsset } from 'typings/defi';

import Button from 'components/Button';
import ExplorerAddress from 'components/Custom/ExplorerAddress';

import { useSaving } from 'store/saving/hooks';
import { useSystemAssetBalance } from 'store/system-balance/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { getStableCoinInstance } from 'contracts/contract-instance';
import { getSavingCompoundRateLastUpdate } from 'contracts/helpers/borrowing-core';

import { formatDate, formatDateRelative } from 'utils/date';

interface Props {
  stablecoinAsset: StablecoinAsset;
}

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

function BalanceOverview ({ stablecoinAsset }: Props) {
  const { t, i18n } = useTranslation();
  const { submitTransaction } = useTransaction();

  const { savingRate, loadSavingRate, updateSavingCompoundRate } = useSaving(stablecoinAsset);
  const {
    systemBalance,
    stablecoinTotalSupply,
    loadSystemBalance,
    loadStableCoinTotalSupply,
  } = useSystemAssetBalance(stablecoinAsset);

  const [stableCoinAddress, setStableCoinAddress] = useState('…');
  const [timeSinceRefreshBalance, setTimeSinceRefreshBalance] = useState<Date | null>(null);
  const [loadingTimeSinceRefreshBalance, setLoadingTimeSinceRefreshBalance] = useState(false);

  const systemBalanceRef = useAnimateNumber(systemBalance, ' ' + stablecoinAsset);
  const totalSupplyRef = useAnimateNumber(stablecoinTotalSupply, ' ' + stablecoinAsset);
  const savingRateRef = useAnimateNumber(savingRate, ' %');

  useEffect(() => {
    getStableCoinInstance(stablecoinAsset).then((contract) => setStableCoinAddress(contract.address));

    loadSavingRate();
    loadSystemBalance();
    loadStableCoinTotalSupply();

    return () => setStableCoinAddress('');
  }, []);

  useInterval(() => {
    getSavingCompoundRateLastUpdate(stablecoinAsset).then(setTimeSinceRefreshBalance);
  }, 50000, { disabled: loadingTimeSinceRefreshBalance, immediate: true });

  const handleRefreshBalance = async () => {
    setLoadingTimeSinceRefreshBalance(true);

    await submitTransaction({
      isClosedModal: true,
      successMessage: t('SAVING_TIME_SINSE_REFRESH_TX'),
      submitFn: updateSavingCompoundRate,
    });

    getSavingCompoundRateLastUpdate(stablecoinAsset).then(setTimeSinceRefreshBalance);
    setLoadingTimeSinceRefreshBalance(false);
    loadSystemBalance();
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
        <p className="text-md color-secondary">
          {t('ASSET_CONTRACT', { asset: stablecoinAsset })}
        </p>
      </div>

      <div>
        <p ref={totalSupplyRef} className="text-xl font-semibold">0 {stablecoinAsset}</p>
        <p className="text-md color-secondary">
          {t('ASSET_TOTAL_SUPPLY', { asset: stablecoinAsset })}
        </p>
      </div>

      <div>
        <p ref={savingRateRef} className="text-xl font-semibold">0 %</p>
        <p className="text-md color-secondary">
          {t('ASSET_SAVING_REWARD', { asset: stablecoinAsset })}
        </p>
      </div>

      <div>
        <p ref={systemBalanceRef} className="text-xl font-semibold">0 {stablecoinAsset}</p>
        <p className="text-md color-secondary">
          {t('ASSET_SYSTEM_BALANCE', { asset: stablecoinAsset })}
        </p>
      </div>

      <div className="balance-overview-refresh">
        <div>
          <p
            className="text-xl font-semibold"
            title={formatDate(timeSinceRefreshBalance, i18n.language)}
          >
            {formatDateRelative(timeSinceRefreshBalance, i18n.language)}
          </p>
          <p className="text-md color-secondary">
            {t('ASSET_SAVING_BALANCE_REFRESHED', { asset: stablecoinAsset })}
          </p>
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
