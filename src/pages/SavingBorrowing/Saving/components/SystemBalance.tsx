import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

import useAnimateNumber from 'hooks/useAnimateNumber';

import { useSystemBalance } from 'store/system-balance/hooks';

const StyledWrapper = styled.div`
  display: grid;
  gap: 4px;
  padding: 24px;
`;

function SystemBalance () {
  const { t } = useTranslation();
  const { systemBalance, getSystemBalance } = useSystemBalance();
  const systemBalanceRef = useAnimateNumber(systemBalance, '');

  useEffect(() => {
    getSystemBalance();
  }, []);

  return (
    <StyledWrapper className="block">
      <h2 className="text-lg">{t('QUSD_SYSTEM_BALANCE')}</h2>
      <p ref={systemBalanceRef} className="text-xl font-semibold earnings-val">0</p>
    </StyledWrapper>
  );
}

export default SystemBalance;
