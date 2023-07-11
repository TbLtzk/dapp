import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useInfinityNumber } from '@q-dev/react-hooks';
import styled from 'styled-components';

import { useSystemBalance } from 'store/system-balance/hooks';
import { useValidationRewards } from 'store/validation-rewards/hooks';

const StyledWrapper = styled.div`
  display: grid;
  gap: 16px;
`;

function PoolBalances () {
  const { t } = useTranslation();
  const { poolBalance, getVRPBalance } = useValidationRewards();
  const { systemReserveBalance, loadSystemReserveBalance } = useSystemBalance();

  const reserveBalanceRef = useInfinityNumber(systemReserveBalance, ' Q');
  const rewardPoolsBalanceRef = useInfinityNumber(poolBalance, ' Q');

  useEffect(() => {
    getVRPBalance();
    loadSystemReserveBalance();
  }, []);

  return (
    <StyledWrapper className="block">
      <div>
        <p ref={reserveBalanceRef} className="text-xl font-semibold" />
        <p className="text-md color-secondary">{t('Q_SYSTEM_RESERVE')}</p>
      </div>
      <div>
        <p ref={rewardPoolsBalanceRef} className="text-xl font-semibold" />
        <p className="text-md color-secondary">{t('VALIDATION_REWARD_POOLS')}</p>
      </div>
    </StyledWrapper>
  );
}

export default PoolBalances;
