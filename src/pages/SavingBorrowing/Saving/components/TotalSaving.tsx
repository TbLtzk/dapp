import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

import useAnimateNumber from 'hooks/useAnimateNumber';

import { useSaving } from 'store/saving/hooks';

const StyledWrapper = styled.div`
  display: grid;
  gap: 4px;
`;

function TotalSavingBalance () {
  const { t } = useTranslation();
  const { totalSavingBalance, getTotalSavingBalance } = useSaving();
  const totalSavingBalanceRef = useAnimateNumber(totalSavingBalance, '');

  useEffect(() => {
    getTotalSavingBalance();
  }, []);

  return (
    <StyledWrapper className="block">
      <h2 className="text-lg">{t('ASSET_SAVINGS', { asset: 'QUSD' })}</h2>
      <p ref={totalSavingBalanceRef} className="text-xl font-semibold">0</p>
    </StyledWrapper>
  );
}

export default TotalSavingBalance;
