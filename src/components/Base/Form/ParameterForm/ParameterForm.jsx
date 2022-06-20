import { useEffect } from 'react';

import { ParameterType } from '@q-dev/q-js-sdk';

import useForm from 'hooks/useForm';

import CurrentParameterValue from '../CurrentParameterValue';
import Input from '../Input';
import Select from '../Select';

import { ParameterFormContainer } from './styles';

import { parameterType, required } from 'func/validators';

function ParameterForm ({ onChange, typeContract }) {
  const form = useForm({
    initialValues: {
      key: '',
      value: '',
      type: ParameterType.ADDRESS
    },
    validators: {
      type: [required],
      key: [required],
      value: [required, parameterType(form => form.type)],
    },
  });

  useEffect(() => {
    onChange(form);
  }, [form.values, onChange]);

  return (
    <ParameterFormContainer>
      <div className="type-fields">
        <Select
          {...form.fields.type}
          invertedColors
          defaultValue={ParameterType.ADDRESS}
          options={[
            { value: ParameterType.ADDRESS, label: 'Address' },
            { value: ParameterType.BOOL, label: 'Boolean' },
            { value: ParameterType.STRING, label: 'String' },
            { value: ParameterType.UINT, label: 'Uint' },
          ]}
        />

        <Input
          {...form.fields.key}
          invertedColors
          placeholder="Key"
        />
      </div>

      <Input
        {...form.fields.value}
        invertedColors
        placeholder="Value"
      />

      <CurrentParameterValue
        typeContract={typeContract}
        parameterType={form.values.type}
        parameterKey={form.values.key}
      />
    </ParameterFormContainer>
  );
}

export default ParameterForm;
