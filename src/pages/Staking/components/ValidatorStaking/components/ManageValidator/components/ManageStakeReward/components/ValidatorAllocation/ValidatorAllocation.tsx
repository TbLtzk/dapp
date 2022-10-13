import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from '@q-dev/q-ui-kit';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import { useUpdateValidatorCompoundRate } from '../../hooks';

import RefreshBlock from './components/RefreshBlock';

import { useTokenomics } from 'store/tokenomics/hooks';
import { useTransaction } from 'store/transaction/hooks';
import { useValidationRewards } from 'store/validation-rewards/hooks';
import { useValidators } from 'store/validators/hooks';

import { formatDate, formatDateRelative, unixToDate } from 'utils/date';

function ValidatorAllocation () {
  const { t, i18n } = useTranslation();
  const { submitTransaction } = useTransaction();

  const {
    defaultAllocationProxy,
    defaultAllocationProxyLoading,
    validationRewardProxy,
    validationRewardProxyLoading,
    getDefaultAllocationProxy,
    getValidationRewardProxy,
    allocateDefaultProxyRewards,
    allocateValidationProxyRewards,
  } = useTokenomics();

  const { lastUpdateOfCompoundRate } = useValidationRewards();
  const { compoundRateKeeperExists, loadCompoundRateKeeperExists } = useValidators();
  const { compoundRateLoading, updateCompoundRate } = useUpdateValidatorCompoundRate();

  const defaultAllocationProxyRef = useAnimateNumber(defaultAllocationProxy);
  const validationRewardProxyRef = useAnimateNumber(validationRewardProxy);

  useEffect(() => {
    loadCompoundRateKeeperExists();
    getDefaultAllocationProxy();
    getValidationRewardProxy();
  }, []);

  useInterval(() => getDefaultAllocationProxy(), 5000, defaultAllocationProxyLoading);

  return (
    <div className="block">
      <div className="block__header">
        <h3 className="text-h3">{t('VALIDATOR_TOKENOMICS')}</h3>
      </div>

      <RefreshBlock
        icon="mdi mdi-cube-outline"
        loading={defaultAllocationProxyLoading}
        title={t('DEFAULT_ALLOCATION_PROXY')}
        onClick={() => submitTransaction({
          successMessage: t('DEFAULT_ALLOCATION_PROXY_SUCCESS'),
          hideLoading: true,
          submitFn: allocateDefaultProxyRewards
        })}
      >
        <p ref={defaultAllocationProxyRef} className="color-primary text-md">0 Q</p>
      </RefreshBlock>

      <RefreshBlock
        icon="mdi mdi-cube-outline"
        loading={validationRewardProxyLoading}
        title={t('VALIDATION_REWARD_PROXY')}
        onClick={() => submitTransaction({
          successMessage: t('VALIDATON_REWARD_PROXY_SUCCESS'),
          hideLoading: true,
          submitFn: allocateValidationProxyRewards
        })}
      >
        <p ref={validationRewardProxyRef} className="color-primary text-md">0 Q</p>
      </RefreshBlock>

      <RefreshBlock
        disabled={!compoundRateKeeperExists}
        icon="mdi mdi-cached"
        loading={compoundRateLoading}
        title={t('TIME_SINCE_LAST_REFRESH_OF_USER_DELEGATIONS')}
        onClick={() => submitTransaction({
          successMessage: t('REFRESH_OF_USER_DELEGATIONS_SUCCESS'),
          hideLoading: true,
          submitFn: updateCompoundRate
        })}
      >
        <Tooltip trigger={<p className="color-primary text-md">{formatDateRelative(unixToDate(lastUpdateOfCompoundRate), i18n.language)}</p>}>
          {formatDate(unixToDate(lastUpdateOfCompoundRate), i18n.language)}
        </Tooltip>
      </RefreshBlock>
    </div>
  );
}

export default ValidatorAllocation;
