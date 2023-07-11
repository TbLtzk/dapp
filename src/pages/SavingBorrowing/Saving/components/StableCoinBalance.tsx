import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAnimateNumber } from '@q-dev/react-hooks';
import { formatNumber } from '@q-dev/utils';
import styled from 'styled-components';
import { StablecoinAsset } from 'typings/defi';

import AssetMenu from 'pages/SavingBorrowing/components/AssetMenu';

import { useSaving } from 'store/saving/hooks';
import { useSystemAssetBalance } from 'store/system-balance/hooks';

import { getStableCoinInstance } from 'contracts/contract-instance';

interface Props {
  asset: StablecoinAsset;
}

const StyledWrapper = styled.div`
  padding: 24px 24px 16px;

  .block__main {
    display: grid;
    gap: 4px;
  }

  .block__sub-info {
    margin-top: 16px;
  }
`;

function StableCoinBalance ({ asset }: Props) {
  const { t } = useTranslation();
  const { savingAvailableToDeposit, loadSavingAvailableToDeposit } = useSaving(asset);
  const { stablecoinTotalSupply, loadStableCoinTotalSupply } = useSystemAssetBalance(asset);

  const [contractAddress, setContractAddress] = useState('…');
  const balanceInQVaultRef = useAnimateNumber(savingAvailableToDeposit || 0, '');

  useEffect(() => {
    loadSavingAvailableToDeposit();
    loadStableCoinTotalSupply();
    getStableCoinInstance(asset).then(({ address }) => setContractAddress(address));
  }, []);

  return (
    <StyledWrapper className="block">
      <div className="block__main">
        <div className="block__header">
          <h2 className="text-lg">{t('ASSET_BALANCE', { asset })}</h2>
          <AssetMenu asset={asset} contractAddress={contractAddress} />
        </div>
        <p ref={balanceInQVaultRef} className="text-xl font-semibold">0</p>
      </div>
      <p className="block__sub-info text-sm font-light">
        {t('TOTAL_SUPPLY_BALANCE', { balance: formatNumber(stablecoinTotalSupply) })}
      </p>
    </StyledWrapper>
  );
}

export default StableCoinBalance;
