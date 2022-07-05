import { useEffect, useState } from 'react';

import { ParameterType } from '@q-dev/q-js-sdk';
import { FormParameter } from 'typings/forms';
import Input from 'ui/Input';
import RadioGroup from 'ui/RadioGroup';
import Select from 'ui/Select';
import Tip from 'ui/Tip';

import useForm from 'hooks/useForm';
import { Form } from 'hooks/useFormArray';

import { ParameterFormContainer } from './styles';

import { getParameterKeysByType, getParameterValueByKey } from 'contracts/helpers/parameters-helper';

import { parameterType, required } from 'func/validators';

interface Props {
  contract: string
  disabled?: boolean
  onChange: (form: Form<FormParameter>) => void
}

function ParameterForm ({
  contract,
  disabled = false,
  onChange
}: Props) {
  const form = useForm({
    initialValues: {
      key: '',
      value: '',
      type: ParameterType.ADDRESS,
      isNew: false,
    },
    validators: {
      type: [required],
      key: [required],
      value: [required, parameterType((form: FormParameter) => form.type)],
      isNew: []
    },
  });

  const [currentValue, setCurrentValue] = useState('');
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    onChange(form);
  }, [form.values, onChange]);

  useEffect(() => {
    getParameterKeysByType(contract, form.values.type)
      .then((data) => setKeys(data || []));

    return () => {
      setKeys([]);
    };
  }, [contract, form.values.type]);

  useEffect(() => {
    if (!keys.includes(String(form.values.key))) {
      setCurrentValue('');
      form.fields.isNew.onChange(true);
      return;
    }

    getParameterValueByKey(contract, form.values.type, form.values.key)
      .then(setCurrentValue);
    form.fields.isNew.onChange(false);

    return () => {
      setCurrentValue('');
    };
  }, [form.values.key, keys]);

  return (
    <ParameterFormContainer>
      <Select
        {...form.fields.key}
        combobox
        label="Parameter key"
        placeholder="Key"
        options={keys.map((key) => ({ label: key, value: key }))}
        disabled={disabled}
      />

      <RadioGroup
        {...form.fields.type}
        label="Parameter type"
        name="parameter-type"
        disabled={disabled}
        options={[
          { value: ParameterType.ADDRESS, label: 'Address' },
          { value: ParameterType.BOOL, label: 'Boolean' },
          { value: ParameterType.STRING, label: 'String' },
          { value: ParameterType.UINT, label: 'Uint' },
        ]}
      />

      {currentValue && (
        <Tip compact>
          {`Current value: ${currentValue}`}
        </Tip>
      )}

      <Input
        {...form.fields.value}
        label="Parameter value"
        placeholder="Value"
        disabled={disabled}
      />
    </ParameterFormContainer>
  );
}

export default ParameterForm;
