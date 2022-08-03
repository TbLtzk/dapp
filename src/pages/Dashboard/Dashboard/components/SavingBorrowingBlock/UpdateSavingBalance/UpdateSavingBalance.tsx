import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';

import useInterval from 'hooks/useInterval';

import { userAddressMetamask } from 'store/user-inf/selectors';

import { getTimeSinceRefreshBalance, refreshTimeSinceRefreshBalance } from 'contracts/helpers/borrowing-core';

function UpdateSavingBalance () {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);

  const [timeSinceRefreshBalance, setTimeSinceRefreshBalance] = useState('0');
  const [loadingTimeSinceRefreshBalance, setLoadingTimeSinceRefreshBalance] = useState(false);

  useEffect(() => {
    getTimeSinceRefreshBalance(setTimeSinceRefreshBalance);
  }, []);

  useInterval(() => {
    getTimeSinceRefreshBalance(setTimeSinceRefreshBalance);
  }, 50000);

  const handleRefreshBalance = () => {
    refreshTimeSinceRefreshBalance(
      setTimeSinceRefreshBalance,
      setLoadingTimeSinceRefreshBalance,
      userAddress,
      dispatch,
      t('SAVING_TIME_SINSE_REFRESH_SUCCESS')
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <p className="text-sm color-secondary">{t('QUSD_SAVING_TIME_SINCE_REFRESH_OF_BALANCE')}</p>
        <p className="text-lg font-semibold">{timeSinceRefreshBalance || '0 day(s) 0 hours 0 minutes'}</p>
      </div>

      <Button
        icon
        loading={loadingTimeSinceRefreshBalance}
        onClick={handleRefreshBalance}
      >
        {!loadingTimeSinceRefreshBalance && <i className="mdi mdi-cached" style={{ fontSize: '20px' }} />}
      </Button>
    </div>
  );
}

export default UpdateSavingBalance;
