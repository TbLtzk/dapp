import { useTranslation } from 'react-i18next';

import { Validator } from 'typings/validator';

import Button from 'ui/Button';

import { StyledWrapper } from '../styles';

import { formatDate, formatDateRelative, unixToDate } from 'utils/date';
import { formatAsset } from 'utils/numbers';

interface Props {
  onButtonClick: () => void;
  validator: Validator;
}

function RewardStats ({ validator, onButtonClick }: Props) {
  const { t, i18n } = useTranslation();

  const rewardStatsArray = [
    {
      id: 'collected-pool',
      label: t('COLLECTED_POOL_REWARDS'),
      value: formatAsset(validator.validatorPoolBalance, 'Q'),
    },
    {
      id: 'outstanding-claims',
      label: t('OUTSTANDING_DELEGATOR_CLAIMS'),
      value: formatAsset(validator.reservedForClaims, 'Q'),
    },
    {
      id: 'delegator-reward',
      label: t('DISTRIBUTABLE_DELEGATOR_REWARDS'),
      value: formatAsset(validator.distributableDelegatorsRewards, 'Q'),
    },
    {
      id: 'rewards-allocated',
      label: t('REWARDS_ALLOCATED'),
      value: formatDateRelative(unixToDate(validator.lastUpdateOfCompoundRate), i18n.language),
      title: formatDate(unixToDate(validator.lastUpdateOfCompoundRate), i18n.language)
    },
  ];

  return (
    <StyledWrapper gridArea="reward-stats" className="block">
      <div className="block__header">
        <h3 className="text-h3">{t('REWARD_STATS')}</h3>
        <Button compact onClick={onButtonClick}>
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
