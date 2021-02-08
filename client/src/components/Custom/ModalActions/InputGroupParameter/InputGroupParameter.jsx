import React, { useCallback, useState, Fragment, useEffect } from 'react';

import FormInput from 'components/Base/Form/FormInput';

import { Wrap } from 'components/Custom/ModalActions/InputGroupParameter/InputGroupParameter';
import { Descr } from '../styles';

function InputGroupParameter(props) {
  const {
    register, errors, inputArr, inputsObj, labelsArr, formData, onChangeInput, value,
    onChangeTypes
  } = props;
  const [valueInput, changeValueInput] = useState(() => {
    return formData?.hasOwnProperty(inputArr[0]?.replace(/ /g, '-')
      .toLowerCase())
      ? formData
      : { ...formData, ...inputsObj };
  });
  console.log('valueInput', valueInput);
  useEffect(() => {
    console.log('formData?.hasOwnProperty', formData?.hasOwnProperty('value'));
    console.log('formData', formData);
    // if (!formData?.hasOwnProperty('value')) {
      changeValueInput({ value: value });
    // }
  }, [value, formData]);

  const refType = useCallback((nameField) => {
    if (nameField !== 'external-link' && nameField !== 'address') {
      return register({ required: 'Field is required!' });
    } else {
      let valueValid = '';
      if (nameField === 'external-link') {
        valueValid = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
      } else if (nameField === 'address') {
        valueValid = /^(0x)?[0-9a-f]{40}$/i;
      }
      else if (nameField === 'value') {
        valueValid ='Value not found. Key does not exist yet?*'
      }
      return register({
        required: 'Field is required!',
        pattern: {
          value: valueValid,
          message: 'Entered value does not match to current format'
        }
      });
    }

  }, []);

  return (
    <div>
      {inputArr?.map((label, i) => {
        const nameField = label.replace(/ /g, '-')
          .toLowerCase();
        console.log(' valueInput', nameField);
        console.log(' valueInput[nameField]', valueInput[nameField]);
        console.log(' valueInput[value]', value);
        let val = valueInput[nameField];
        return (
          <Fragment key={i}>
            {labelsArr ? <Descr>{labelsArr[i]}</Descr> : null}
            <FormInput
              name={nameField}
              onChange={(value) => {
                const valObg = { [nameField]: value.target.value };
                changeValueInput({ ...valueInput, ...valObg });
                onChangeInput ? onChangeInput(value.target.value) : null;
              }}
              value={val}
              placeholder={label}
              ref={refType(nameField)}
              valid={errors[nameField]?.message}
            />
          </Fragment>
        );
      })}
    </div>
  );
}

export default InputGroupParameter;


