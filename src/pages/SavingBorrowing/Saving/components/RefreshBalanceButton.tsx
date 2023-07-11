import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '@q-dev/q-ui-kit';
import { StablecoinAsset } from 'typings/defi';

import Button from 'components/Button';

import { useSaving, useSavingAssets } from 'store/saving/hooks';
import { useTransaction } from 'store/transaction/hooks';

interface Props {
  asset: StablecoinAsset;
}

function RefreshBalanceButton ({ asset }: Props) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { loadSavingAssets } = useSavingAssets();

  const {
    updateSavingCompoundRate,
    loadTotalSavingBalance,
    loadSavingBalanceDetails
  } = useSaving(asset);

  const [loading, setLoading] = useState(false);

  const handleRefreshBalance = async () => {
    setLoading(true);

    await submitTransaction({
      isClosedModal: true,
      successMessage: t('SAVING_TIME_SINSE_REFRESH_TX'),
      submitFn: updateSavingCompoundRate,
    });

    loadSavingAssets();
    loadTotalSavingBalance();
    loadSavingBalanceDetails();
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
