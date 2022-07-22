import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';

import useAnimateNumber from 'hooks/useAnimateNumber';

import { getOutstandingDebt, getTotalSavingBalance } from 'store/borrowing-core/actions';
import {
  outstandingDebtSelector,
  totalSavingBalanceSelector,
} from 'store/borrowing-core/selectors';
import { getSavingAviableToDeposit } from 'store/saving-assets/action-creators';
import { savingAviableToDepositSelector } from 'store/saving-assets/selectors';

function Overview () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const outstandingDebt = useSelector(outstandingDebtSelector);
  const outstandingDebtRef = useAnimateNumber(outstandingDebt, ' QUSD');

  const totalSavingBalance = useSelector(totalSavingBalanceSelector);
  const totalSavingBalanceRef = useAnimateNumber(totalSavingBalance, ' QUSD');

  const qusdBalanceInQVault = useSelector(savingAviableToDepositSelector);
  const qusdBalanceInQVaultRef = useAnimateNumber(qusdBalanceInQVault || 0, ' QUSD');

  useEffect(() => {
    dispatch(getOutstandingDebt());
    dispatch(getTotalSavingBalance());
    dispatch(getSavingAviableToDeposit());
  }, []);

  return (
    <CustomBlock>
      <h1>{t('OVERVIEW')}</h1>

      <h5>{t('QUSD_BALANCE')}</h5>
      <p ref={qusdBalanceInQVaultRef}>0 QUSD</p>

      <h5>{t('TOTAL_SAVING_BALANCE')}</h5>
      <p ref={totalSavingBalanceRef}>0 QUSD</p>

      <h5>{t('OUTSTANDING_DEBT')}</h5>
      <p ref={outstandingDebtRef}>0 QUSD</p>

      {
        // TODO: add proper values from sdk
        /* <h5>{t('Full Minted Amount')}</h5>
      <p ref={mintedAmountRef}>0 QUSD</p>

      <h5>{t('Full Normalized Debt')}</h5>
      <p ref={normalizedDebtRef}>0 QUSD</p> */
      }

      {/* <h5>{t('Liquidation Full Debt')}</h5>
      <p ref={liquidationFullDebtRef}>0 QUSD</p> */}
    </CustomBlock>
  );
}

export default Overview;
