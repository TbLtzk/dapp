import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Input from 'ui/Input';
import Select from 'ui/Select';
import Tip from 'ui/Tip';

import useForm from 'hooks/useForm';

import { formatAsset } from 'utils/numbers';
import { address, required } from 'utils/validators';

interface Props {
  onChange: (form: any) => void;
  validators: [];
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

  const options = validators.map(({ address }: { address: string }) => ({ label: address, value: address }));
  const chosenAddress = validators.find(({ address }: { address: string }) => address === form.values.address) as any;

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
            <p className="text-md">{`${t('DELEGATOR_SHARE')} : ${formatAsset(chosenAddress.delegatorShare, ' %')}`}</p>
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
