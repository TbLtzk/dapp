import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { media } from 'styles/media';

import Button from 'ui/Button';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import { getQVBalance, } from 'store/q-vault/action-creators';
import { qvBalance, } from 'store/q-vault/selectors';
import { getQHolderTimeUpdate } from 'store/tokenomics/action-creators';
import { qHolderTimeUpdateLoadingSelector, qHolderTimeUpdateSelector } from 'store/tokenomics/selectors';

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
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const qHolderTimeUpdate = unixToDate(useSelector(qHolderTimeUpdateSelector));
  const qHolderTimeUpdateLoading = useSelector(qHolderTimeUpdateLoadingSelector);

  const balanceDetails = useSelector(qvBalance);
  const interestRatePercentageRef = useAnimateNumber(balanceDetails?.interestRatePercentage, ' %');
  const yearlyExpectedEarningsRef = useAnimateNumber(balanceDetails?.yearlyExpectedEarnings);

  useEffect(() => {
    dispatch(getQVBalance());
    dispatch(getQHolderTimeUpdate(false));
  }, []);

  useInterval(() => {
    dispatch(getQHolderTimeUpdate(false));
  }, 30_000, qHolderTimeUpdateLoading);

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
            title={formatDate(qHolderTimeUpdate, i18n.language)}
          >
            {formatDateRelative(qHolderTimeUpdate, i18n.language)}
          </p>
        </div>
      </div>

      <Button
        className="update-reward-action"
        loading={qHolderTimeUpdateLoading}
        onClick={() => dispatch(getQHolderTimeUpdate(true, t('TIME_SINCE_Q_TOKEN_HOLDER_REWARD_UPDATE_SUCCESS')))}
      >
        {t('ALLOCATE_REWARDS')}
      </Button>
    </StyledWrapper>
  );
}

export default EarnBlock;
