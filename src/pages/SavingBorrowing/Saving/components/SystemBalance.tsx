import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAnimateNumber } from '@q-dev/react-hooks';
import { formatNumber } from '@q-dev/utils';
import styled from 'styled-components';
import { StablecoinAsset } from 'typings/defi';

import { useSystemAssetBalance } from 'store/system-balance/hooks';

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

function SystemBalance ({ asset }: Props) {
  const { t } = useTranslation();
  const {
    systemBalanceDebt,
    systemBalance,
    loadSystemBalance,
    loadSystemBalanceDebt
  } = useSystemAssetBalance(asset);

  const systemBalanceRef = useAnimateNumber(systemBalance, '');

  useEffect(() => {
    loadSystemBalance();
    loadSystemBalanceDebt();
  }, []);

  return (
    <StyledWrapper className="block">
      <div className="block__main">
        <h2 className="text-lg">{t('ASSET_SYSTEM_BALANCE', { asset })}</h2>
        <p ref={systemBalanceRef} className="text-xl font-semibold earnings-val">0</p>
      </div>
      <p className="block__sub-info text-sm font-light">
        {t('OPEN_DEBT_BALANCE', { balance: formatNumber(systemBalanceDebt) })}
      </p>
    </StyledWrapper>
  );
}

export default SystemBalance;
