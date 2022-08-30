import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Tooltip from 'ui/Tooltip';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import { useUpdateValidatorCompoundRate } from '../../hooks';

import RefreshBlock from './components/RefreshBlock';

import { getDefaultAllocationProxy, getRootNodeRewardProxy, getValidationRewardProxy } from 'store/tokenomics/action-creators';
import {
  defaultAllocationProxyLoadingSelector,
  defaultAllocationProxySelector,
  validationRewardProxyLoadingSelector,
  validationRewardProxySelector,
} from 'store/tokenomics/selectors';
import { lastUpdateOfCompoundRateSelector } from 'store/validation-reward-pools/selectors';
import { getCompoundRateKeeperExists } from 'store/validators/action-creators';
import { compoundRateKeeperExistsSelector } from 'store/validators/selectors';

import { formatDate, formatDateRelative, unixToDate } from 'utils/date';

function ValidatorAllocation () {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const lastUpdateCompoundRate = useSelector(lastUpdateOfCompoundRateSelector);
  const compoundRateKeeperExist = useSelector(compoundRateKeeperExistsSelector);

  const { compountRateLoading, updateCompoundRate } = useUpdateValidatorCompoundRate();

  const defaultAllocationProxyRef = useAnimateNumber(useSelector(defaultAllocationProxySelector));
  const defaultAllocationProxyLoading = useSelector(defaultAllocationProxyLoadingSelector);

  const validationRewardProxyRef = useAnimateNumber(useSelector(validationRewardProxySelector));
  const validationRewardProxyLoading = useSelector(validationRewardProxyLoadingSelector);

  useEffect(() => {
    dispatch(getCompoundRateKeeperExists());
    dispatch(getDefaultAllocationProxy(false));
    dispatch(getRootNodeRewardProxy(false));
    dispatch(getValidationRewardProxy(false));
  }, []);

  useInterval(() => dispatch(getDefaultAllocationProxy(false)), 5000, defaultAllocationProxyLoading);

  return (
    <div className="block">
      <div className="block__header">
        <h3 className="text-h3">{t('VALIDATOR_TOKENOMICS')}</h3>
      </div>

      <RefreshBlock
        icon="mdi mdi-cube-outline"
        loading={defaultAllocationProxyLoading}
        title={t('DEFAULT_ALLOCATION_PROXY')}
        onClick={() => dispatch(getDefaultAllocationProxy(true, t('DEFAULT_ALLOCATION_PROXY_SUCCESS')))}
      >
        <p ref={defaultAllocationProxyRef} className="color-primary text-md">0 Q</p>
      </RefreshBlock>

      <RefreshBlock
        icon="mdi mdi-cube-outline"
        loading={validationRewardProxyLoading}
        title={t('Validation Reward Proxy')}
        onClick={() => dispatch(getValidationRewardProxy(true, t('VALIDATON_REWARD_PROXY_SUCCESS')))}
      >
        <p ref={validationRewardProxyRef} className="color-primary text-md">0 Q</p>
      </RefreshBlock>

      <RefreshBlock
        disabled={!compoundRateKeeperExist}
        icon="mdi mdi-cached"
        loading={compountRateLoading}
        title={t('TIME_SINCE_LAST_REFRESH_OF_USER_DELEGATIONS')}
        onClick={() => updateCompoundRate(t('REFRESH_OF_USER_DELEGATIONS_SUCCESS'))}
      >
        <Tooltip trigger={<p className="color-primary text-md">{formatDateRelative(unixToDate(lastUpdateCompoundRate), i18n.language)}</p>}>
          {formatDate(unixToDate(lastUpdateCompoundRate), i18n.language)}
        </Tooltip>
      </RefreshBlock>
    </div>
  );
}

export default ValidatorAllocation;
