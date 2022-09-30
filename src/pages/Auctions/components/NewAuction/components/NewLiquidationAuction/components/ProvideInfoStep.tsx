
import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';

import { FormStep } from 'components/MultiStepForm';
import Input from 'ui/Input';

import { useLiquidationAuctionForm } from '../NewLiquidationAuction';

import { MAX_BID_AMOUNT } from 'constants/boundaries';
import { address, max, required, vaultID } from 'utils/validators';

function ProvideInfoStep () {
  const { t } = useTranslation();
  const { goNext } = useLiquidationAuctionForm();

  const form = useForm({
    initialValues: { vaultOwner: '', bid: '', vaultId: '' },
    validators: {
      vaultOwner: [required, address],
      bid: [required, max(MAX_BID_AMOUNT)],
      vaultId: [required, vaultID],
    },
    onSubmit: goNext,
  });

  return (
    <FormStep disabled={!form.isValid} onNext={form.submit}>
      <Input
        {...form.fields.vaultOwner}
        label={t('PROVIDE_USER_ADDRESS_OF_VAULT_HOLDER')}
        placeholder="0x0000"
      />
      <Input
        {...form.fields.vaultId}
        label={t('PROVIDE_THE_VAULT_ID_TO_BE_LIQUIDATED')}
        placeholder="Vault ID"
      />
      <Input
        {...form.fields.bid}
        label={t('PROVIDE_YOUR_INITIAL_BID_IN_QUSD')}
        placeholder={t('BID')}
      />
    </FormStep>
  );
}

export default ProvideInfoStep;
