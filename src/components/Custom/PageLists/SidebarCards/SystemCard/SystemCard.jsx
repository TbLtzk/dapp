import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';
import LoadingSpinner from 'components/Base/LoadingSpinner';

import { onPerformNetting } from 'store/system-balance/action-creators';
import { loadingPerformNetting } from 'store/system-balance/selectors';

function SystemCard ({ data, title }) {
  const dispatch = useDispatch();
  const loadingPerfNetting = useSelector(loadingPerformNetting);

  const onHandlePerformNetting = useCallback(() => {
    dispatch(onPerformNetting());
  }, [dispatch]);

  return (
    <CustomBlock>
      <h1>{title}</h1>
      {data.map((elem) => (
        <div key={elem.title}>
          <h5>{elem.title}</h5>
          <p>{elem.value}</p>
        </div>
      ))}
      {title === 'QUSD System Balance'
        ? (
          <div className="card__actions">
            <Button
              title={!loadingPerfNetting ? 'Perform Netting' : <LoadingSpinner />}
              type="white"
              style={{ width: '140px' }}
              onClick={onHandlePerformNetting}
            />
          </div>
        )
        : null}
    </CustomBlock>
  );
}

export default SystemCard;
