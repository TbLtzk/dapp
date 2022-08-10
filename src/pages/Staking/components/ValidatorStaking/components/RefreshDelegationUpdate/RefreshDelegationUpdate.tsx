import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Tooltip from 'ui/Tooltip';

import useInterval from 'hooks/useInterval';

import { userAddressMetamask } from 'store/user-inf/selectors';
import { setVRPUpdateValidatorsCompoundRate } from 'store/validation-reward-pools/action-creators';
import { lastUpdateOfCompoundRate, loadingUpdateOfCompoundRate } from 'store/validation-reward-pools/selectors';

import { formatDate, formatDateRelative, unixToDate } from 'utils/date';

function RefreshDelegationUpdate () {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const userAddress = useSelector(userAddressMetamask);
  const lastUpdateCompoundRate = useSelector(lastUpdateOfCompoundRate);
  const loadingUpdateCompoundRate = useSelector(loadingUpdateOfCompoundRate);

  const [timeDelegationUpdate, setTimeDelegationUpdate] = useState<Date | null>(null);

  useEffect(() => {
    setTimeDelegationUpdate(unixToDate(lastUpdateCompoundRate));
  }, [lastUpdateCompoundRate]);

  useInterval(() => {
    setTimeDelegationUpdate(unixToDate(lastUpdateCompoundRate));
  }, 30000);

  const handleUpdateCompoundRate = () => {
    dispatch(setVRPUpdateValidatorsCompoundRate(userAddress, t('REFRESH_OF_USER_DELEGATIONS_SUCCESS')));
  };

  return (
    <div className="refresh-delegation_container">
      <div>
        <p className="text-md">{t('USER_DELEGATIONS_REFRESHED')}</p>
        <Tooltip trigger={<h4 className="text-xl">{formatDateRelative(timeDelegationUpdate)}</h4>}>
          {formatDate(timeDelegationUpdate)}
        </Tooltip>
      </div>

      <Button
        icon
        loading={loadingUpdateCompoundRate}
        onClick={handleUpdateCompoundRate}
      >
        {!loadingUpdateCompoundRate && (
          <i className="mdi mdi-cached" style={{ fontSize: '20px' }} />
        )}
      </Button>

    </div>
  );
}

export default RefreshDelegationUpdate;
