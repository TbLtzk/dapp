import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAnimateNumber } from '@q-dev/react-hooks';
import styled from 'styled-components';

import { useSystemBalance } from 'store/system-balance/hooks';

const StyledWrapper = styled.div`
  display: grid;
  gap: 4px;
  padding: 24px;
`;

function TotalSupply () {
  const { t } = useTranslation();
  const { stableCoinTotalSupply, getStableCoinTotalSupply } = useSystemBalance();
  const totalSupplyRef = useAnimateNumber(stableCoinTotalSupply, '');

  useEffect(() => {
    getStableCoinTotalSupply();
  }, []);

  return (
    <StyledWrapper className="block">
      <h2 className="text-lg">{t('QUSD_TOTAL_SUPPLY')}</h2>
      <p ref={totalSupplyRef} className="text-xl font-semibold">0</p>
    </StyledWrapper>
  );
}

export default TotalSupply;
