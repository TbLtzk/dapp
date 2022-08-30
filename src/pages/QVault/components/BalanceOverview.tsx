import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { media } from 'styles/media';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import {
  getAccountBalance,
  getMinimumQVaultTimeLock,
  getUserBalance,
} from 'store/q-vault/action-creators';
import {
  accountBalance,
  qVaultMinimumTimeLock,
  userBalance,
} from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

const StyledWrapper = styled.div`
  display: grid;
  gap: 24px;

  ${media.lessThan('medium')} {
    gap: 16px;
  }

  .balance-values {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;

    ${media.lessThan('medium')} {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
`;

function BalanceOverview () {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userAddress = useSelector(userAddressMetamask);
  const userQVBalance = useSelector(userBalance);
  const userQVBalanceRef = useAnimateNumber(userQVBalance);

  const qVaultLockedAmount = Number(useSelector(qVaultMinimumTimeLock));
  const qVaultLockedAmountRef = useAnimateNumber(qVaultLockedAmount);

  const userAccountBalance = useSelector(accountBalance);
  const userAccountBalanceRef = useAnimateNumber(userAccountBalance);

  useEffect(() => {
    dispatch(getAccountBalance(userAddress));
    dispatch(getUserBalance(userAddress));
    dispatch(getMinimumQVaultTimeLock(userAddress));
  }, [dispatch]);

  useInterval(() => {
    dispatch(getMinimumQVaultTimeLock(userAddress));
  }, 5000);

  return (
    <StyledWrapper className="block">
      <h2 className="text-h2">{t('OVERVIEW')}</h2>
      <div className="balance-values">
        <div>
          <p className="text-md color-secondary">{t('Q_VAULT_BALANCE')}</p>
          <p ref={userQVBalanceRef} className="text-xl font-semibold">0 Q</p>
        </div>

        <div>
          <p className="text-md color-secondary">{t('Q_ADDRESS_BALANCE')}</p>
          <p ref={userAccountBalanceRef} className="text-xl font-semibold">0 Q</p>
        </div>

        <div>
          <p className="text-md color-secondary">{t('TIME_LOCKED_AMOUNT')}</p>
          <p ref={qVaultLockedAmountRef} className="text-xl font-semibold">0 Q</p>
        </div>
      </div>
    </StyledWrapper>
  );
}

export default BalanceOverview;
