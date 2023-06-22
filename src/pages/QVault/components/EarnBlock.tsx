import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { media } from '@q-dev/q-ui-kit';
import { useAnimateNumber, useInterval } from '@q-dev/react-hooks';
import styled from 'styled-components';

import Button from 'components/Button';

import { useQVault } from 'store/q-vault/hooks';
import { useTokenomics } from 'store/tokenomics/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { formatDate, formatDateRelative, unixToDate } from 'utils/date';

const StyledWrapper = styled.div`
  display: grid;
  gap: 24px;

  .reward-values {
    display: grid;
    gap: 12px;
  }

  .update-reward-action {
    ${media.lessThan('medium')} {
      width: 100%;
    }
  }
`;

function EarnBlock () {
  const { t, i18n } = useTranslation();
  const { submitTransaction } = useTransaction();

  const { qvBalance, loadQVBalanceDetails } = useQVault();
  const {
    qHolderUpdateTime,
    qHolderUpdateTimeLoading,
    getQHolderUpdateTime,
    allocateQHolderRewards
  } = useTokenomics();

  const interestRatePercentageRef = useAnimateNumber(qvBalance.interestRatePercentage, ' %');
  const yearlyExpectedEarningsRef = useAnimateNumber(qvBalance.yearlyExpectedEarnings);

  useEffect(() => {
    loadQVBalanceDetails();
  }, []);

  useInterval(getQHolderUpdateTime, 30_000, {
    disabled: qHolderUpdateTimeLoading,
    immediate: true
  });

  return (
    <StyledWrapper className="block">
      <div>
        <h2 className="text-h2">{t('EARN')}</h2>
        <p className="text-md color-secondary">{t('EARN_DESCRIPTION')}</p>
      </div>

      <div className="reward-values">
        <div>
          <p className="text-md color-secondary">{t('Q_TOKEN_HOLDER_REWARD_RATE')}</p>
          <p ref={interestRatePercentageRef} className="text-xl font-semibold">0 %</p>
        </div>

        <div>
          <p className="text-md color-secondary">{t('YEARLY_EXPECTED_REWARD')}</p>
          <p ref={yearlyExpectedEarningsRef} className="text-xl font-semibold">0 Q</p>
        </div>

        <div>
          <p className="text-md color-secondary">{t('Q_TOKEN_HOLDER_REWARD_UPDATED')}</p>
          <p
            className="text-xl font-semibold"
            title={formatDate(unixToDate(qHolderUpdateTime), i18n.language)}
          >
            {formatDateRelative(unixToDate(qHolderUpdateTime), i18n.language)}
          </p>
        </div>
      </div>

      <Button
        className="update-reward-action"
        loading={qHolderUpdateTimeLoading}
        onClick={() => submitTransaction({
          successMessage: t('TIME_SINCE_Q_TOKEN_HOLDER_REWARD_UPDATE_TX'),
          submitFn: allocateQHolderRewards
        })}
      >
        {t('ALLOCATE_REWARDS')}
      </Button>
    </StyledWrapper>
  );
}

export default EarnBlock;
