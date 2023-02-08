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
  gap: 16px;

  .token-holder-time {
    display: flex;
    gap: 16px;
    align-items: center;

    ${media.lessThan('medium')} {
      justify-content: space-between;
    }
  }

  .token-holder-time-icon {
    font-size: 20px;
  }
`;

function TokenHolderRewards () {
  const { t, i18n } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { qvBalance, loadQVBalanceDetails } = useQVault();
  const {
    qHolderUpdateTime,
    qHolderUpdateTimeLoading,
    getQHolderUpdateTime,
    allocateQHolderRewards
  } = useTokenomics();

  const balanceRewardPoolRef = useAnimateNumber(qvBalance.qHolderRewardPool);

  useEffect(() => {
    loadQVBalanceDetails();
    getQHolderUpdateTime();
  }, []);

  useInterval(() => {
    getQHolderUpdateTime();
  }, 5000, qHolderUpdateTimeLoading);

  return (
    <StyledWrapper className="block">
      <div>
        <p ref={balanceRewardPoolRef} className="text-xl font-semibold">0 Q</p>
        <p className="text-md color-secondary">{t('Q_TOKEN_HOLDER_REWARD_POOL')}</p>
      </div>
      <div className="token-holder-time">
        <div>
          <p
            className="text-xl font-semibold"
            title={formatDate(unixToDate(qHolderUpdateTime), i18n.language)}
          >
            {formatDateRelative(unixToDate(qHolderUpdateTime), i18n.language)}
          </p>
          <p className="text-md color-secondary">{t('Q_TOKEN_HOLDER_REWARD_UPDATED')}</p>
        </div>
        <Button
          icon
          loading={qHolderUpdateTimeLoading}
          onClick={() => submitTransaction({
            successMessage: t('TIME_SINCE_Q_TOKEN_HOLDER_REWARD_UPDATE_TX'),
            isClosedModal: true,
            submitFn: allocateQHolderRewards
          })}
        >
          {!qHolderUpdateTimeLoading && <i className="mdi mdi-cached token-holder-time-icon" />}
        </Button>
      </div>
    </StyledWrapper>
  );
}

export default TokenHolderRewards;
