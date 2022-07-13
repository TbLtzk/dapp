
import Input from 'ui/Input';

import FormBlock from 'components/FormBlock';
import { FormStep } from 'components/MultiStepForm';

import useForm from 'hooks/useForm';

import { useSystemDebtAuctionForm } from '../NewSystemDebtAuction';

import { MAX_BID_AMOUNT } from 'constants/numbers';
import { max, required } from 'func/validators';

interface Props {
  reserveLot: string | number;
}

function ProvideInfoStep ({ reserveLot }: Props) {
  const { goNext } = useSystemDebtAuctionForm();

  const form = useForm({
    initialValues: { bid: '' },
    validators: { bid: [required, max(MAX_BID_AMOUNT)] },
    onSubmit: goNext,
  });

  return (
    <FormStep disabled={!form.isValid} onNext={form.submit}>
      <FormBlock title="Debt Auction Lot">
        <p className="text-lg">
          {reserveLot} Q
        </p>
      </FormBlock>

      <Input
        {...form.fields.bid}
        type="number"
        label={'Provide your initial Bid in QUSD'}
        placeholder="Bid"
      />
    </FormStep>
  );
}

export default ProvideInfoStep;
