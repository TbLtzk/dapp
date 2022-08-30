import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { media } from 'styles/media';

import Button from 'ui/Button';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import { getQVBalance } from 'store/q-vault/action-creators';
import { qvBalance } from 'store/q-vault/selectors';
import { getQHolderTimeUpdate } from 'store/tokenomics/action-creators';
import { qHolderTimeUpdateLoadingSelector, qHolderTimeUpdateSelector } from 'store/tokenomics/selectors';

import { formatDate, formatDateRelative, unixToDate } from 'utils/date';

const StyledWrapper = styled.div`
  grid-area: holder;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  ${media.lessThan('medium')} {
    grid-template-columns: 1fr;
  }

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
  const dispatch = useDispatch();

  const balanceDetails = useSelector(qvBalance);
  const balanceRewardPoolRef = useAnimateNumber(balanceDetails?.qHolderRewardPool);
  const balanceInterestRateRef = useAnimateNumber(balanceDetails?.interestRatePercentage, ' %');

  const qHolderTimeUpdate = unixToDate(useSelector(qHolderTimeUpdateSelector));
  const qHolderTimeUpdateLoading = useSelector(qHolderTimeUpdateLoadingSelector);

  useEffect(() => {
    dispatch(getQVBalance());
    dispatch(getQHolderTimeUpdate(false));
  }, []);

  useInterval(() => {
    dispatch(getQHolderTimeUpdate(false));
  }, 5000, qHolderTimeUpdateLoading);

  return (
    <StyledWrapper className="block">
      <div>
        <p ref={balanceRewardPoolRef} className="text-xl font-semibold">0 Q</p>
        <p className="text-md color-secondary">{t('Q_TOKEN_HOLDER_REWARD_POOL')}</p>
      </div>
      <div>
        <p ref={balanceInterestRateRef} className="text-xl font-semibold">0 %</p>
        <p className="text-md color-secondary">{t('Q_TOKEN_HOLDER_REWARD_RATE')}</p>
      </div>
      <div className="token-holder-time">
        <div>
          <p
            className="text-xl font-semibold"
            title={formatDate(qHolderTimeUpdate, i18n.language)}
          >
            {formatDateRelative(qHolderTimeUpdate, i18n.language)}
          </p>
          <p className="text-md color-secondary">{t('Q_TOKEN_HOLDER_REWARD_UPDATED')}</p>
        </div>
        <Button
          icon
          loading={qHolderTimeUpdateLoading}
          onClick={() => dispatch(getQHolderTimeUpdate(true, t('TIME_SINCE_Q_TOKEN_HOLDER_REWARD_UPDATE_SUCCESS')))}
        >
          {!qHolderTimeUpdateLoading && <i className="mdi mdi-cached token-holder-time-icon" />}
        </Button>
      </div>
    </StyledWrapper>
  );
}

export default TokenHolderRewards;
