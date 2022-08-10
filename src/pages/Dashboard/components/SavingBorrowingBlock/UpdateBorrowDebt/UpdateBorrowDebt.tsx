import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Asset } from 'typings/defi';

import Button from 'ui/Button';
import Tooltip from 'ui/Tooltip';

import useInterval from 'hooks/useInterval';

import { userAddressMetamask } from 'store/user-inf/selectors';

import { getTimeSinceOutstandingDebt, refreshTimeSinceOutstandingDebt } from 'contracts/helpers/borrowing-core';

import { formatDate, formatDateRelative } from 'utils/date';

interface Props {
  asset: Asset;
}

function UpdateBorrowDebt ({ asset }: Props) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);

  const [timeSinceOutstandingDebt, setTimeSinceOutstandingDebt] = useState<Date | null>(null);
  const [loadingTimeSinceOutstandingDeb, setLoadingTimeSinceOutstandingDeb] = useState(false);

  useEffect(() => {
    getTimeSinceOutstandingDebt(setTimeSinceOutstandingDebt, asset);
  }, []);

  useInterval(() => {
    getTimeSinceOutstandingDebt(setTimeSinceOutstandingDebt, asset);
  }, 50000);

  const handleRefreshDebt = () => {
    refreshTimeSinceOutstandingDebt(
      setTimeSinceOutstandingDebt,
      setLoadingTimeSinceOutstandingDeb,
      userAddress,
      dispatch,
      asset,
      t('TIME_SINCE_LAST_REFRESH_SUCCESS')
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <p className="text-sm color-secondary">{`QUSD - ${asset} ${t('OUTSTANDING_DEBT_REFRESHED')}`}</p>
        <Tooltip trigger={<p className="text-lg font-semibold">{formatDateRelative(timeSinceOutstandingDebt)}</p>}>
          {formatDate(timeSinceOutstandingDebt)}
        </Tooltip>
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
