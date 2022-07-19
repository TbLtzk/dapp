
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const { goNext } = useSystemDebtAuctionForm();

  const form = useForm({
    initialValues: { bid: '' },
    validators: { bid: [required, max(MAX_BID_AMOUNT)] },
    onSubmit: goNext,
  });

  return (
    <FormStep disabled={!form.isValid} onNext={form.submit}>
      <FormBlock title={t('DEBT_AUCTION_LOT')}>
        <p className="text-lg">
          {reserveLot} Q
        </p>
      </FormBlock>

      <Input
        {...form.fields.bid}
        type="number"
        label={t('PROVIDE_YOUR_INITIAL_BID_IN_QUSD')}
        placeholder={t('BID')}
      />
    </FormStep>
  );
}

export default ProvideInfoStep;
