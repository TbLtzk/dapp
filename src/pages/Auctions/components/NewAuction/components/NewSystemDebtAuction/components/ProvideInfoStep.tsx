import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { Select } from '@q-dev/q-ui-kit';
import { formatNumber } from '@q-dev/utils';
import { StablecoinAsset } from 'typings/defi';

import FormBlock from 'components/FormBlock';
import Input from 'components/Input';
import { FormStep } from 'components/MultiStepForm';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useSystemDebtAuctionForm } from '../NewSystemDebtAuction';

import { useStablecoinBalance } from 'store/saving/hooks';

import { max, required } from 'utils/validators';

interface Props {
  reserveLot: string | number;
}

function ProvideInfoStep ({ reserveLot }: Props) {
  const { t } = useTranslation();
  const { goNext } = useSystemDebtAuctionForm();
  const { stablecoins, qTicker } = useNetworkConfig();
  const [userAssetBalance, setUserAssetBalance] = useState('0');

  const form = useForm({
    initialValues: { asset: stablecoins[0], bid: '' },
    validators: { asset: [required], bid: [required, max(userAssetBalance)] },
    onSubmit: (form) => goNext({
      asset: form.asset as StablecoinAsset,
      bid: form.bid
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
      <FormBlock title={t('DEBT_AUCTION_LOT')}>
        <p className="text-lg">
          {reserveLot} {qTicker}
        </p>
      </FormBlock>

      <Select
        {...form.fields.asset}
        label={t('DEBT_ASSET')}
        options={stablecoins.map((key) => ({ label: key, value: key }))}
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
