
import Input from 'ui/Input';

import { FormStep } from 'components/MultiStepForm';

import useForm from 'hooks/useForm';

import { useLiquidationAuctionForm } from '../NewLiquidationAuction';

import { MAX_BID_AMOUNT } from 'constants/numbers';
import { address, max, required, vaultID } from 'func/validators';

function ProvideInfoStep () {
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
        label="Provide user address of vault holder, which shall be liquidated"
        placeholder="0x0000"
      />
      <Input
        {...form.fields.vaultId}
        label="Provide the Vault ID to be liquidated"
        placeholder="Vault ID"
      />
      <Input
        {...form.fields.bid}
        label={'Provide your initial Bid in QUSD'}
        placeholder="Bid"
      />
    </FormStep>
  );
}

export default ProvideInfoStep;
