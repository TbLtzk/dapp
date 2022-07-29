import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Asset } from 'typings/defi';
import Button from 'ui/Button';

import useInterval from 'hooks/useInterval';

import { userAddressMetamask } from 'store/user-inf/selectors';

import { getTimeSinceOutstandingDebt, refreshTimeSinceOutstandingDebt } from 'contracts/helpers/borrowing-core';

import { remainDateTimeSince } from 'func/convertDate';

interface Props {
  asset: Asset
}

function UpdateBorrowDebt ({ asset }: Props) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);

  const [timeSinceOutstandingDebt, setTimeSinceOutstandingDebt] = useState<string | number>('0');
  const [timeSinceUnixTimestampOutstandingDeb, setTimeSinceUnixTimestampOutstandingDeb] = useState<string>('0');
  const [loadingTimeSinceOutstandingDeb, setLoadingTimeSinceOutstandingDeb] = useState(false);

  useEffect(() => {
    getTimeSinceOutstandingDebt(setTimeSinceOutstandingDebt, setTimeSinceUnixTimestampOutstandingDeb, asset);
  }, []);

  useInterval(() => {
    setTimeSinceOutstandingDebt(remainDateTimeSince(timeSinceUnixTimestampOutstandingDeb));
  }, 30000);

  const handleRefreshDebt = () => {
    refreshTimeSinceOutstandingDebt(
      setTimeSinceOutstandingDebt,
      setLoadingTimeSinceOutstandingDeb,
      setTimeSinceUnixTimestampOutstandingDeb,
      userAddress,
      dispatch,
      asset
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <p className="text-sm color-secondary">{`QUSD - ${asset} ${t('TIME_SINCE_LAST_REFRESH_OF_OUTSTANDING_DEBT')}`}</p>
        <p className="text-lg font-semibold">{timeSinceOutstandingDebt || '0 day(s) 0 hours 0 minutes'}</p>
      </div>

      <Button
        icon
        loading={loadingTimeSinceOutstandingDeb}
        onClick={handleRefreshDebt}
      >
        {!loadingTimeSinceOutstandingDeb && <i className="mdi mdi-cached" style={{ fontSize: '20px' }} />}
      </Button>
    </div>
  );
}

export default UpdateBorrowDebt;
