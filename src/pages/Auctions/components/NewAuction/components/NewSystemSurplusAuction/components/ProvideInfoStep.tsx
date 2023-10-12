import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { Select } from '@q-dev/q-ui-kit';
import { formatNumber } from '@q-dev/utils';
import { StablecoinAsset } from 'typings/defi';

import FormBlock from 'components/FormBlock';
import Input from 'components/Input';
import { FormStep } from 'components/MultiStepForm';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useSystemSurplusAuctionForm } from '../NewSystemSurplusAuction';

import { useQVault } from 'store/q-vault/hooks';

import { getEPDRUint } from 'contracts/helpers/epdr-param-helper';

import { MIN_SYSTEM_SURPLUS_BID_AMOUNT } from 'constants/boundaries';
import { max, min, required } from 'utils/validators';

interface Props {
  surplusLot: number | string;
  setSurplusLot: (val: string | number) => void;
}

function ProvideInfoStep ({ surplusLot, setSurplusLot }: Props) {
  const { t } = useTranslation();
  const { stablecoins } = useNetworkConfig();
  const { goNext } = useSystemSurplusAuctionForm();
  const { loadWalletBalance, walletBalance } = useQVault();

  const form = useForm({
    initialValues: { asset: stablecoins[0], bid: '' },
    validators: { asset: [required],
      bid: [required, min(MIN_SYSTEM_SURPLUS_BID_AMOUNT), max(walletBalance)] },
    onSubmit: (form) => goNext({
      asset: form.asset as StablecoinAsset,
      bid: form.bid
    }),
  });

  useEffect(() => {
    getEPDRUint(`governed.EPDR.${form.values.asset}_surplusLot`).then((value) => setSurplusLot(value));

    return () => setSurplusLot(0);
  }, [form.values.asset]);

  useEffect(() => {
    loadWalletBalance();
  }, []);

  return (
    <FormStep disabled={!form.isValid} onNext={form.submit}>
      <Select
        {...form.fields.asset}
        label={t('SURPLUS_ASSET')}
        options={stablecoins.map((key) => ({ label: key, value: key }))}
      />

      <FormBlock title={t('SYSTEM_SURPLUS_LOT')}>
        <p className="text-lg">
          {surplusLot} {form.values.asset}
        </p>
      </FormBlock>

      <Input
        {...form.fields.bid}
        type="number"
        label={t('YOUR_INITIAL_BID_IN_ASSET', { asset: 'Q' })}
        placeholder={t('BID')}
        labelTip={t('AVAILABLE_WITH_AMOUNT', { amount: formatNumber(walletBalance) })}
      />
    </FormStep>
  );
}

export default ProvideInfoStep;
