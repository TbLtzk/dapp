
import { useTranslation } from 'react-i18next';

import FormBlock from 'components/FormBlock';
import { FormStep } from 'components/MultiStepForm';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { useSystemSurplusAuctionForm } from '../NewSystemSurplusAuction';

import { MAX_BID_AMOUNT } from 'constants/numbers';
import { max, required } from 'utils/validators';

interface Props {
  surplusLot: number | string;
}

function ProvideInfoStep ({ surplusLot }: Props) {
  const { t } = useTranslation();

  const { goNext } = useSystemSurplusAuctionForm();

  const form = useForm({
    initialValues: { bid: '' },
    validators: { bid: [required, max(MAX_BID_AMOUNT)] },
    onSubmit: goNext,
  });

  return (
    <FormStep disabled={!form.isValid} onNext={form.submit}>
      <FormBlock title={t('SYSTEM_SURPLUS_LOT')}>
        <p className="text-lg">
          {surplusLot} QUSD
        </p>
      </FormBlock>

      <Input
        {...form.fields.bid}
        type="number"
        label={t('PROVIDE_YOUR_INITIAL_BID_IN_Q')}
        placeholder={t('BID')}
      />
    </FormStep>
  );
}

export default ProvideInfoStep;
