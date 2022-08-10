import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Spinner from 'ui/Spinner';
import Tooltip from 'ui/Tooltip';

import useInterval from 'hooks/useInterval';

import { getQHolderTimeUpdate } from 'store/tokenomics/action-creators';
import { qHolderTimeUpdateLoadingSelector, qHolderTimeUpdateSelector } from 'store/tokenomics/selectors';

import { formatDate, formatDateRelative, unixToDate } from 'utils/date';

function QTokenRewardUpdate () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const qHolderTimeUpdate = useSelector(qHolderTimeUpdateSelector);
  const qHolderTimeUpdateLoading = useSelector(qHolderTimeUpdateLoadingSelector);

  const [qHolderTimeUpdateTime, setQHolderTimeUpdateTime] = useState<Date | null>(null);

  useInterval(() => {
    setQHolderTimeUpdateTime(unixToDate(qHolderTimeUpdate));
  }, 30000);

  useEffect(() => {
    if (Number(qHolderTimeUpdate)) {
      setQHolderTimeUpdateTime(unixToDate(qHolderTimeUpdate));
    }
  }, [qHolderTimeUpdate]);

  useEffect(() => {
    dispatch(getQHolderTimeUpdate(false, t('TIME_SINCE_Q_TOKEN_HOLDER_REWARD_UPDATE_SUCCESS')));
  }, []);

  const handleQHolderTimeUpdate = () => {
    dispatch(getQHolderTimeUpdate(true));
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p className="text-sm color-secondary">{t('Q_TOKEN_HOLDER_REWARD_UPDATED')}</p>
          <Tooltip trigger={<p className="text-lg font-semibold">{formatDateRelative(qHolderTimeUpdateTime)}</p>}>
            {formatDate(qHolderTimeUpdateTime)}
          </Tooltip>
        </div>

        <div>
          <Button
            compact
            disabled={qHolderTimeUpdateLoading}
            onClick={handleQHolderTimeUpdate}
          >
            {qHolderTimeUpdateLoading ? <Spinner /> : <i className="mdi mdi-cube-outline" />}
            <span>{t('ALLOCATE')}</span>
          </Button>
        </div>
      </div>
      <div className="block__line" />
    </>
  );
}

export default QTokenRewardUpdate;
