import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import useInfinityNumber from 'hooks/useInfinityNumber';

import { getSystemReserveBalance } from 'store/system-balance/action-creators';
import { systemReserveBalanceSelector } from 'store/system-balance/selectors';
import { getRewardPoolsBalance } from 'store/validation-reward-pools/action-creators';
import { rewardPoolsBalanceSelector } from 'store/validation-reward-pools/selectors';

const StyledWrapper = styled.div`
  grid-area: balance;
  display: grid;
  gap: 16px;
`;

function PoolBalances () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const reserveBalance = useSelector(systemReserveBalanceSelector);
  const reserveBalanceRef = useInfinityNumber(reserveBalance, ' Q');

  const rewardPoolsBalance = useSelector(rewardPoolsBalanceSelector);
  const rewardPoolsBalanceRef = useInfinityNumber(rewardPoolsBalance, ' Q');

  useEffect(() => {
    dispatch(getRewardPoolsBalance());
    dispatch(getSystemReserveBalance());
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
