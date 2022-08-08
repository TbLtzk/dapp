import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';

import useInterval from 'hooks/useInterval';

import { userAddressMetamask } from 'store/user-inf/selectors';
import { setVRPUpdateValidatorsCompoundRate } from 'store/validation-reward-pools/action-creators';
import { lastUpdateOfCompoundRate, loadingUpdateOfCompoundRate } from 'store/validation-reward-pools/selectors';

import { remainDateTimeSince } from 'utils/convertDate';

function RefreshDelegationUpdate () {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const userAddress = useSelector(userAddressMetamask);
  const lastUpdateCompoundRate = useSelector(lastUpdateOfCompoundRate);
  const loadingUpdateCompoundRate = useSelector(loadingUpdateOfCompoundRate);

  const [timeDelegationUpdate, setTimeDelegationUpdate] = useState<string | number>(0);

  useEffect(() => {
    setTimeDelegationUpdate(remainDateTimeSince(lastUpdateCompoundRate));
  }, [lastUpdateCompoundRate]);

  useInterval(() => {
    setTimeDelegationUpdate(remainDateTimeSince(lastUpdateCompoundRate));
  }, 30000);

  const handleUpdateCompoundRate = () => {
    dispatch(setVRPUpdateValidatorsCompoundRate(userAddress, 'REFRESH_OF_USER_DELEGATIONS_SUCCESS'));
  };

  return (
    <div className="refresh-delegation_container">
      <div>
        <p className="text-md">{t('TIME_SINCE_LAST_REFRESH_OF_USER_DELEGATIONS')}</p>
        <h4 className="text-xl">{timeDelegationUpdate || t('0_DAY_0_HOURS_0_MINUTES')}</h4>
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
