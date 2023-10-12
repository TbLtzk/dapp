import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { Select } from '@q-dev/q-ui-kit';
import { formatNumber } from '@q-dev/utils';
import { StablecoinAsset } from 'typings/defi';

import Input from 'components/Input';
import { FormStep } from 'components/MultiStepForm';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useLiquidationAuctionForm } from '../NewLiquidationAuction';

import { useStablecoinBalance } from 'store/saving/hooks';

import { address, max, required, vaultID } from 'utils/validators';

function ProvideInfoStep () {
  const { t } = useTranslation();
  const { goNext } = useLiquidationAuctionForm();
  const { stablecoins } = useNetworkConfig();
  const [userAssetBalance, setUserAssetBalance] = useState('0');

  const form = useForm({
    initialValues: {
      asset: stablecoins[0],
      vaultOwner: '',
      bid: '',
      vaultId: ''
    },
    validators: {
      asset: [required],
      vaultOwner: [required, address],
      bid: [required, max(userAssetBalance)],
      vaultId: [required, vaultID],
    },
    onSubmit: (form) => goNext({
      ...form,
      asset: form.asset as StablecoinAsset,
    }),
  });

  const {
    stablecoinBalance,
    loadStablecoinBalance
  } = useStablecoinBalance(form.values.asset as StablecoinAsset);

  useEffect(() => {
    loadStablecoinBalance();
  }, [loadStablecoinBalance]);

  useEffect(() => {
    setUserAssetBalance(stablecoinBalance);
  }, [stablecoinBalance]);

  return (
    <FormStep disabled={!form.isValid} onNext={form.submit}>
      <Select
        {...form.fields.asset}
        label={t('BORROWING_ASSET')}
        options={stablecoins.map((key) => ({ label: key, value: key }))}
      />

      <Input
        {...form.fields.vaultOwner}
        label={t('USER_ADDRESS_OF_VAULT_HOLDER')}
        placeholder="0x0000"
      />
      <Input
        {...form.fields.vaultId}
        label={t('THE_VAULT_ID_TO_BE_LIQUIDATED')}
        type="number"
        placeholder={t('VAULT_ID')}
      />
      <Input
        {...form.fields.bid}
        type="number"
        label={t('YOUR_INITIAL_BID_IN_ASSET', { asset: form.values.asset })}
        placeholder={t('BID')}
        labelTip={t('AVAILABLE_WITH_AMOUNT', { amount: formatNumber(userAssetBalance) })}
      />
    </FormStep>
  );
}

export default ProvideInfoStep;
