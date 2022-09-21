import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'ui/Button';
import Icon from 'ui/Icon';

import { useSaving, useSavingAssets } from 'store/saving/hooks';
import { useTransaction } from 'store/transaction/hooks';

function RefreshBalanceButton () {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { getSavingAssets } = useSavingAssets();

  const {
    updateSavingCompoundRate,
    getTotalSavingBalance,
    getSavingBalanceDetails
  } = useSaving();

  const [loading, setLoading] = useState(false);

  const handleRefreshBalance = async () => {
    setLoading(true);

    await submitTransaction({
      hideLoading: true,
      successMessage: t('SAVING_TIME_SINSE_REFRESH_SUCCESS'),
      submitFn: updateSavingCompoundRate,
    });

    getSavingAssets();
    getTotalSavingBalance();
    getSavingBalanceDetails();
    setLoading(false);
  };

  return (

    <Button
      icon
      compact
      look="ghost"
      loading={loading}
      onClick={handleRefreshBalance}
    >
      {!loading && <Icon name="refresh" />}
    </Button>
  );
}

export default RefreshBalanceButton;
