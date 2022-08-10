import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Tooltip from 'ui/Tooltip';

import useInterval from 'hooks/useInterval';

import { userAddressMetamask } from 'store/user-inf/selectors';

import { getTimeSinceRefreshBalance, refreshTimeSinceRefreshBalance } from 'contracts/helpers/borrowing-core';

import { formatDate, formatDateRelative } from 'utils/date';

function UpdateSavingBalance () {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);

  const [timeSinceRefreshBalance, setTimeSinceRefreshBalance] = useState<Date | null>(null);
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
        <p className="text-sm color-secondary">{t('QUSD_SAVING_BALANCE_REFRESHED')}</p>
        <Tooltip trigger={<p className="text-lg font-semibold">{formatDateRelative(timeSinceRefreshBalance)}</p>}>
          {formatDate(timeSinceRefreshBalance)}
        </Tooltip>
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
