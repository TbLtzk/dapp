import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { address, required } from 'utils/validators';

interface Props {
  onAdd: () => void;
  onRemove: () => void;
  onChange: (form: any) => void;
}

function DelegationForm ({ onAdd, onRemove, onChange }: Props) {
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

  return (
    <form
      noValidate
      className="delegation-form_container"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="delegation-form_inputs">
        <Input
          label={t('VALIDATOR_ADDRESS')}
          {...form.fields.address}
          placeholder="0x000"
        />

        <Input
          label={t('AMOUNT_NEW_STAKE')}
          {...form.fields.amount}
          type="number"
          placeholder="0.00"
        />
      </div>
      <div className="delegation-form_buttons">
        <Button style={{ width: '37px', marginRight: '5px' }} onClick={onAdd}>
          <i className="mdi mdi-plus" />
        </Button>
        <Button style={{ width: '37px' }} onClick={onRemove}>
          <i className="mdi mdi-minus" />
        </Button>
      </div>
    </form>
  );
}

export default DelegationForm;
