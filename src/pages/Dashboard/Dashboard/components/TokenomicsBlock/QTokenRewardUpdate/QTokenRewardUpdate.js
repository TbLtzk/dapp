import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import LoadingSpinner from 'components/Base/LoadingSpinner';

import useInterval from 'hooks/useInterval';

import { getQHolderTimeUpdate } from 'store/tokenomics/action-creators';
import { qHolderTimeUpdateLoadingSelector, qHolderTimeUpdateSelector } from 'store/tokenomics/selectors';

import { remainDateTimeSince } from 'func/convertDate';

function QTokenRewardUpdate() {
  const dispatch = useDispatch();

  const qHolderTimeUpdate = useSelector(qHolderTimeUpdateSelector);
  const qHolderTimeUpdateLoading = useSelector(qHolderTimeUpdateLoadingSelector);

  const [qHolderTimeUpdateTime, setQHolderTimeUpdateTime] = useState(0);

  useInterval(() => {
    setQHolderTimeUpdateTime(remainDateTimeSince(qHolderTimeUpdate));
  }, 30000);

  useEffect(() => {
    if (Number(qHolderTimeUpdate)) {
      setQHolderTimeUpdateTime(remainDateTimeSince(qHolderTimeUpdate));
    }
  }, [qHolderTimeUpdate]);

  useEffect(() => {
    dispatch(getQHolderTimeUpdate(false));
  }, []);

  const handleQHolderTimeUpdate = () => {
    dispatch(getQHolderTimeUpdate(true));
  };

  const spinner = <LoadingSpinner size="sm" type="light" />;

  return (
    <>
      <div className="card_block">
        <div>
          <h5>Time since Q Token holder reward update</h5>
          <p>{qHolderTimeUpdateTime || '0 day(s) 0 hours 0 minutes'}</p>
        </div>
        <div>
          <Button disabled={qHolderTimeUpdateLoading} style={{ width: '100%' }} onClick={handleQHolderTimeUpdate}>
            {qHolderTimeUpdateLoading ? spinner : <i className="mdi mdi-cube-outline" />}
            <span>Allocate</span>
          </Button>
        </div>
      </div>
      <div style={{ margin: '10px 0px 20px 0px' }} className="card__line" />
    </>
  );
}

export default QTokenRewardUpdate;
