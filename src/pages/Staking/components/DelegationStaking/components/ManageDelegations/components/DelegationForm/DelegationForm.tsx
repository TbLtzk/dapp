import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Select } from '@q-dev/q-ui-kit';
import { Validator } from 'typings/validator';

import Input from 'components/Input';
import Tip from 'ui/Tip';

import useForm from 'hooks/useForm';
import { Form } from 'hooks/useFormArray';

import { formatAsset } from 'utils/numbers';
import { address, required } from 'utils/validators';

interface Props {
  onChange: (form: Form<{ address: string; amount: string }>) => void;
  validators: Validator[];
}

function DelegationForm ({ onChange, validators }: Props) {
  const { t } = useTranslation();

  const form = useForm({
    initialValues: { address: '', amount: '' },
    validators: {
      address: [required, address],
      amount: [required],
    },
  });

  useEffect(() => {
    onChange(form);
  }, [form.values, onChange]);

  const options = validators.map(({ address }) => ({ label: address, value: address }));
  const chosenAddress = validators.find(({ address }) => address === form.values.address);

  return (
    <form
      noValidate
      className="delegation-form_container"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="delegation-form_inputs">
        <Select
          {...form.fields.address}
          combobox
          label={t('VALIDATOR_ADDRESS')}
          placeholder={t('ADDRESS')}
          options={options}
          style={{ marginBottom: '15px' }}
        />
        {chosenAddress !== undefined && (
          <Tip compact style={{ marginBottom: '10px' }}>
            <p className="text-md">{`${t('DELEGATOR_SHARE')} : ${formatAsset(chosenAddress.delegatorsShare, ' %')}`}</p>
            <p className="text-md">
              {`${t('DELEGATION_EFFICIENCY')} : ${formatAsset(chosenAddress.delegationEfficiency, ' %')}`}
            </p>
          </Tip>
        )}
        <Input
          label={t('AMOUNT_NEW_STAKE')}
          {...form.fields.amount}
          type="number"
          placeholder="0.00"
        />
      </div>
    </form>
  );
}

export default DelegationForm;
