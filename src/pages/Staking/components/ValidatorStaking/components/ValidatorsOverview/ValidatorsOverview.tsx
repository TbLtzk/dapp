import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatAsset } from '@q-dev/utils';
import sumBy from 'lodash/sumBy';

import { ValidatorsOverviewContainer } from '../../styles';

import { useValidators } from 'store/validators/hooks';

function ValidatorsOverview () {
  const { t } = useTranslation();
  const { validatorStats, validatorStatsLoading } = useValidators();

  const totalStake = useMemo(() => {
    return sumBy(validatorStats, ({ totalStake }: { totalStake: string }) => Number(totalStake));
  }, [validatorStats]);

  const totalDelegatedStake = useMemo(() => {
    return sumBy(validatorStats, ({ delegatedStake }: { delegatedStake: string }) => Number(delegatedStake));
  }, [validatorStats]);

  return (
    <ValidatorsOverviewContainer>
      <div className="field_item">
        <p className="color-secondary text-md">{t('CURRENT_VALIDATORS')}</p>
        <p className="text-xl font-semibold">{validatorStatsLoading ? '...' : validatorStats.length}</p>
      </div>

      <div className="field_item">
        <p className="color-secondary text-md">{t('TOTAL_STAKE')}</p>
        <p className="text-xl font-semibold">{validatorStatsLoading ? '... Q' : formatAsset(totalStake, 'Q')}</p>
      </div>

      <div className="field_item">
        <p className="color-secondary text-md">{t('TOTAL_DELEGATED_STAKE')}</p>
        <p className="text-xl font-semibold">{validatorStatsLoading ? '... Q' : formatAsset(totalDelegatedStake, 'Q')}</p>
      </div>
    </ValidatorsOverviewContainer>
  );
}

export default ValidatorsOverview;
