import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';

import useAnimateNumber from 'hooks/useAnimateNumber';

import {
  getTotalCollateralLockedAndOutstandingDebt,
  getTotalSavingBalance,
} from 'store/borrowing-core/action-creators';
import {
  outstandingDebtSelector,
  totalCollateralLockedSelector,
  totalSavingBalanceSelector,
} from 'store/borrowing-core/selectors';

function Overview () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const outstandingDebt = useSelector(outstandingDebtSelector);
  const outstandingDebtRef = useAnimateNumber(outstandingDebt, ' QUSD');

  const totalSavingBalance = useSelector(totalSavingBalanceSelector);
  const totalSavingBalanceRef = useAnimateNumber(totalSavingBalance, ' QUSD');

  const totalCollateralLocked = useSelector(totalCollateralLockedSelector);
  const totalCollateralLockedRef = useAnimateNumber(totalCollateralLocked, ' QUSD');

  useEffect(() => {
    dispatch(getTotalSavingBalance());
    dispatch(getTotalCollateralLockedAndOutstandingDebt());
  }, []);

  return (
    <CustomBlock>
      <h1>{t('OVERVIEW')}</h1>

      <h5>{t('TOTAL_SAVING_BALANCE')}</h5>
      <p ref={outstandingDebtRef}>0 QUSD</p>

      <h5>{t('OUTSTANDING_DEBT')}</h5>
      <p ref={totalSavingBalanceRef}>0 QUSD</p>

      <h5>{t('TOTAL_COLLATERAL_LOCKED')}</h5>
      <p ref={totalCollateralLockedRef}>0 QUSD</p>
    </CustomBlock>
  );
}

export default Overview;
