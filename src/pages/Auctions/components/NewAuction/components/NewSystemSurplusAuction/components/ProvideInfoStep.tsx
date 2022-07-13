
import Input from 'ui/Input';

import FormBlock from 'components/FormBlock';
import { FormStep } from 'components/MultiStepForm';

import useForm from 'hooks/useForm';

import { useSystemSurplusAuctionForm } from '../NewSystemSurplusAuction';

import { MAX_BID_AMOUNT } from 'constants/numbers';
import { max, required } from 'func/validators';

interface Props {
  surplusLot: number | string;
}

function ProvideInfoStep ({ surplusLot }: Props) {
  const { goNext } = useSystemSurplusAuctionForm();

  const form = useForm({
    initialValues: { bid: '' },
    validators: { bid: [required, max(MAX_BID_AMOUNT)] },
    onSubmit: goNext,
  });

  return (
    <FormStep disabled={!form.isValid} onNext={form.submit}>
      <FormBlock title="Auction Lot">
        <p className="text-lg">
          {surplusLot} QUSD
        </p>
      </FormBlock>

      <Input
        {...form.fields.bid}
        type="number"
        label="Provide your initial Bid in Q"
        placeholder="Bid"
      />
    </FormStep>
  );
}

export default ProvideInfoStep;
