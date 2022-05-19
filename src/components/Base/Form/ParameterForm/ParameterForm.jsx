import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ParameterType } from '@q-dev/q-js-sdk';

import CurrentParameterValue from 'components/Custom/ModalActions/CurrentParameterValue';

import useForm from 'hooks/useForm';

import { SelectWrapper } from '../FormSelect/styles';
import Input from '../Input';

import { ParameterFormContainer } from './styles';

import { theme } from 'store/theme/selectors';

import { parameterType, required } from 'func/validators';

function ParameterForm ({ onChange, typeContract }) {
  const currentTheme = useSelector(theme);
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

  const handleSelectChange = (event) => {
    form.fields.type.onChange(event.target.value);
  };

  useEffect(() => {
    onChange(form);
  }, [form.values, onChange]);

  return (
    <ParameterFormContainer>
      <div className="select_contaier">
        <SelectWrapper width="auto" palette={currentTheme}>
          <select value={form.values.type} onChange={handleSelectChange}>
            <option defaultValue value={ParameterType.ADDRESS}>
              Address
            </option>
            <option value={ParameterType.BOOL}>Boolean</option>
            <option value={ParameterType.STRING}>String</option>
            <option value={ParameterType.UINT}>Uint</option>
          </select>
        </SelectWrapper>

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
