import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { sumBy } from 'lodash';

import { ValidatorsOverviewContainer } from '../../styles';

import {
  loadingValidatorsWidenedSelector,
  validatorsWidenedSelector,
} from 'store/validators/selectors';

import { formatAsset } from 'utils/numbers';

function ValidatorsOverview () {
  const { t } = useTranslation();

  const validators = useSelector(validatorsWidenedSelector);
  const tableLoading = useSelector(loadingValidatorsWidenedSelector);

  const totalStake = useMemo(() => {
    return sumBy(validators, ({ totalStake }: { totalStake: string }) => Number(totalStake));
  }, [validators]);

  const totalDelegatedStake = useMemo(() => {
    return sumBy(validators, ({ delegatedStake }: { delegatedStake: string }) => Number(delegatedStake));
  }, [validators]);

  return (
    <ValidatorsOverviewContainer>
      <div className="field_item">
        <p className="color-secondary text-md">{t('Current validators')}</p>
        <p className="text-xl font-semibold">{tableLoading ? '...' : validators.length}</p>
      </div>

      <div className="field_item">
        <p className="color-secondary text-md">{t('TOTAL_STAKE')}</p>
        <p className="text-xl font-semibold">{tableLoading ? '... Q' : formatAsset(totalStake, 'Q')}</p>
      </div>

      <div className="field_item">
        <p className="color-secondary text-md">{t('TOTAL_DELEGATED_STAKE')}</p>
        <p className="text-xl font-semibold">{tableLoading ? '... Q' : formatAsset(totalDelegatedStake, 'Q')}</p>
      </div>
    </ValidatorsOverviewContainer>
  );
}

export default ValidatorsOverview;
