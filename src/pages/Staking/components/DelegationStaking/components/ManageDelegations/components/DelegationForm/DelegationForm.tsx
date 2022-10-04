import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Validator } from 'typings/validator';

import Input from 'ui/Input';
import Select from 'ui/Select';
import Tip from 'ui/Tip';

import useForm from 'hooks/useForm';
import { Form } from 'hooks/useFormArray';

import { formatAsset } from 'utils/numbers';
import { address, max, required } from 'utils/validators';

interface Props {
  onChange: (form: Form<{ address: string; amount: string }>) => void;
  validators: Validator[];
  availableValidators: Validator[];
  delegatedStake: string;
  maxAmount: string;
  addresses: string[];
}

const duplicateAddress = (addresses: string[]) => (address: string) => {
  return {
    isValid: addresses.indexOf(address) === -1,
    message: 'Duplicate address'
  };
};

const validator = (validators: Validator[]) => (val: string) => {
  return {
    isValid: validators.some(({ address }) => address === val),
    message: 'Not a validator'
  };
};

function DelegationForm ({ onChange, validators, availableValidators, delegatedStake, maxAmount, addresses }: Props) {
  const { t } = useTranslation();

  const form = useForm({
    initialValues: { address: '', amount: '' },
    validators: {
      address: [required, address, duplicateAddress(addresses), validator(validators)],
      amount: [required, max(maxAmount)],
    },
  });

  useEffect(() => {
    onChange(form);
  }, [form.values, onChange]);

  const options = availableValidators.map(({ address }) => ({ label: address, value: address }));
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
            <p className="text-md">{`${t('DELEGATOR_SHARE')} : ${formatAsset(chosenAddress.delegatorsShare, '%')}`}</p>
            <p className="text-md">
              {`${t('DELEGATION_EFFICIENCY')} : ${formatAsset(chosenAddress.delegationEfficiency, '%')}`}
            </p>
            <p className="text-md">
              {`${t('DELEGATED_STAKE')} : ${formatAsset(delegatedStake, 'Q')}`}
            </p>
          </Tip>
        )}
        <Input
          label={t('AMOUNT_NEW_STAKE')}
          {...form.fields.amount}
          type="number"
          placeholder="0.00"
          max={maxAmount}
        />
      </div>
    </form>
  );
}

export default DelegationForm;
