import { useTranslation } from 'react-i18next';

import { formatAsset } from '@q-dev/utils';
import { Validator } from 'typings/validator';

import Button from 'components/Button';

import { StyledWrapper } from '../styles';

import { formatDate, formatDateRelative, unixToDate } from 'utils/date';

interface Props {
  onButtonClick: () => void;
  validator: Validator;
  buttonLoading: boolean;
}

function RewardStats ({ validator, onButtonClick, buttonLoading }: Props) {
  const { t, i18n } = useTranslation();

  const rewardStatsArray = [
    {
      id: 'collected-pool',
      label: t('COLLECTED_POOL_REWARDS'),
      value: formatAsset(validator.poolInfo.validatorPoolBalance, 'Q'),
    },
    {
      id: 'outstanding-claims',
      label: t('OUTSTANDING_DELEGATOR_CLAIMS'),
      value: formatAsset(validator.poolInfo.reservedForClaims, 'Q'),
    },
    {
      id: 'delegator-reward',
      label: t('DISTRIBUTABLE_DELEGATOR_REWARDS'),
      value: formatAsset(validator.poolInfo.distributableDelegatorsRewards, 'Q'),
    },
    {
      id: 'rewards-allocated',
      label: t('REWARDS_ALLOCATED'),
      value: formatDateRelative(unixToDate(validator.poolInfo.lastUpdateOfCompoundRate), i18n.language),
      title: formatDate(unixToDate(validator.poolInfo.lastUpdateOfCompoundRate), i18n.language)
    },
  ];

  return (
    <StyledWrapper gridArea="reward-stats" className="block">
      <div className="block__header">
        <h3 className="text-h3">{t('REWARD_STATS')}</h3>
        <Button
          compact
          disabled={!validator.poolInfo.distributableDelegatorsRewards}
          loading={buttonLoading}
          onClick={onButtonClick}
        >
          {t('ALLOCATE_REWARDS')}
        </Button>
      </div>

      {rewardStatsArray.map(({ id, label, value, title }, index) => (
        <div key={id} className={`row ${!index ? 'block__content' : ''}`}>
          <p className="color-secondary text-md">{label}</p>
          <p className="color-primary text-md" title={title}>{value}</p>
        </div>
      ))}
    </StyledWrapper>
  );
}

export default RewardStats;
