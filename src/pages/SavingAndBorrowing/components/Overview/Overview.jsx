import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';
import LoadingSpinner from 'components/Base/LoadingSpinner';

import {
  getTotalCollateralLockedAndOutstandingDebt,
  getTotalSavingBalance
} from 'store/borrowing-core/action-creators';
import {
  outstandingDebtSelector,
  totalCollateralLockedSelector,
  totalSavingBalanceSelector
} from 'store/borrowing-core/selectors';

import { fN } from 'func/useful';

function Overview () {
  const dispatch = useDispatch();

  const outstandingDebt = useSelector(outstandingDebtSelector);
  const totalSavingBalance = useSelector(totalSavingBalanceSelector);
  const totalCollateralLocked = useSelector(totalCollateralLockedSelector);

  useEffect(() => {
    dispatch(getTotalSavingBalance());
    dispatch(getTotalCollateralLockedAndOutstandingDebt());
  }, []);

  return (
    <CustomBlock>
      <h1>Overview</h1>
      <h5>Total Saving Balance</h5>
      {!totalSavingBalance ? <LoadingSpinner /> : <p>{fN(totalSavingBalance) + ' QUSD'}</p>}
      <h5>Outstanding Debt</h5>
      {!outstandingDebt ? <LoadingSpinner /> : <p>{fN(outstandingDebt) + ' USD'}</p>}
      <h5>Total Collateral Locked</h5>
      {!totalCollateralLocked ? <LoadingSpinner /> : <p>{fN(totalCollateralLocked) + ' USD'}</p>}
    </CustomBlock>
  );
}

export default Overview;
