import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import CustomBlock from 'components/Base/CustomBlock';

import useAnimateNumber from 'hooks/useAnimateNumber';

import { useBorrowingCore } from 'store/borrowing-core/hooks';
import { useSavingAssets } from 'store/saving-assets/hooks';

function Overview () {
  const { t } = useTranslation();
  const { savingAvailableToDeposit, getSavingAvailableToDeposit } = useSavingAssets();
  const {
    outstandingDebt,
    totalSavingBalance,
    getOutstandingDebt,
    getTotalSavingBalance,
  } = useBorrowingCore();

  const outstandingDebtRef = useAnimateNumber(outstandingDebt, ' QUSD');
  const totalSavingBalanceRef = useAnimateNumber(totalSavingBalance, ' QUSD');

  const qusdBalanceInQVaultRef = useAnimateNumber(savingAvailableToDeposit || 0, ' QUSD');

  useEffect(() => {
    getOutstandingDebt();
    getTotalSavingBalance();
    getSavingAvailableToDeposit();
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
