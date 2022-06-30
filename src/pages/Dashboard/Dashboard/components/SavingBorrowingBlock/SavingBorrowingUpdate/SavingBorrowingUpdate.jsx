import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';

import useInterval from 'hooks/useInterval';

import { userAddressMetamask } from 'store/user-inf/selectors';

import {
  getTimeSinceOutstandingDebt,
  getTimeSinceRefreshBalance,
  refreshTimeSinceOutstandingDebt,
  refreshTimeSinceRefreshBalance,
} from 'contracts/helpers/borrowing-core-helper';

import { remainDateTimeSince } from 'func/convertDate';

function SavingBorrowingUpdate () {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);

  const [timeSinceRefreshBalance, setTimeSinceRefreshBalance] = useState('0');
  const [timeSinceUnixTimestampRefreshBalance, setTimeSinceUnixTimestampRefreshBalance] = useState('0');
  const [loadingTimeSinceRefreshBalance, setLoadingTimeSinceRefreshBalance] = useState(false);

  const [timeSinceOutstandingDebt, setTimeSinceOutstandingDebt] = useState('0');
  const [timeSinceUnixTimestampOutstandingDeb, setTimeSinceUnixTimestampOutstandingDeb] = useState('0');
  const [loadingTimeSinceOutstandingDeb, setLoadingTimeSinceOutstandingDeb] = useState(false);

  useEffect(() => {
    getTimeSinceRefreshBalance(setTimeSinceRefreshBalance, setTimeSinceUnixTimestampRefreshBalance);
    getTimeSinceOutstandingDebt(setTimeSinceOutstandingDebt, setTimeSinceUnixTimestampOutstandingDeb);
  }, []);

  useInterval(() => {
    setTimeSinceRefreshBalance(remainDateTimeSince(timeSinceUnixTimestampRefreshBalance));
    setTimeSinceOutstandingDebt(remainDateTimeSince(timeSinceUnixTimestampOutstandingDeb));
  }, 30000);

  const handleRefreshBalance = () => {
    refreshTimeSinceRefreshBalance(
      setTimeSinceRefreshBalance,
      setLoadingTimeSinceRefreshBalance,
      setTimeSinceUnixTimestampRefreshBalance,
      userAddress,
      dispatch
    );
  };

  const handleRefreshDebt = () => {
    refreshTimeSinceOutstandingDebt(
      setTimeSinceOutstandingDebt,
      setLoadingTimeSinceOutstandingDeb,
      setTimeSinceUnixTimestampOutstandingDeb,
      userAddress,
      dispatch
    );
  };

  return (
    <div>
      <div className="card_block">
        <div>
          <h5>{t('QUSD_SAVING_TIME_SINCE_REFRESH_OF_BALANCE')}</h5>
          <div className="card_text">{timeSinceRefreshBalance || '0 day(s) 0 hours 0 minutes'}</div>
        </div>

        <div>
          <Button
            icon
            loading={loadingTimeSinceRefreshBalance}
            onClick={handleRefreshBalance}
          >
            {!loadingTimeSinceRefreshBalance && (
              <i className="mdi mdi-cached" style={{ fontSize: '20px' }} />
            )}
          </Button>
        </div>
      </div>

      <div className="card_block">
        <div>
          <h5>{t('QUSD_QBTC_TIME_SINCE_REFRESH_OF_OUTSTANDING_DEBT')}</h5>
          <div className="card_text">{timeSinceOutstandingDebt || '0 day(s) 0 hours 0 minutes'}</div>
        </div>

        <div>
          <Button
            icon
            loading={loadingTimeSinceOutstandingDeb}
            onClick={handleRefreshDebt}
          >
            {!loadingTimeSinceOutstandingDeb && (
              <i className="mdi mdi-cached" style={{ fontSize: '20px' }} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SavingBorrowingUpdate;
