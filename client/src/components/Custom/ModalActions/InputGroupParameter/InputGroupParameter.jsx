import React, { useCallback, useState, Fragment, useEffect } from 'react';

import FormInput from 'components/Base/Form/FormInput';

import { Wrap } from 'components/Custom/ModalActions/InputGroupParameter/InputGroupParameter';
import { Descr } from '../styles';

function InputGroupParameter(props) {
  const {
    register, errors, inputArr, inputsObj, labelsArr, formData, onChangeInput, value
  } = props;
  // const [valueInput, changeValueInput] = useState(() => {
  //   return formData?.hasOwnProperty(inputArr[0]?.replace(/ /g, '-')
  //     .toLowerCase())
  //     ? formData
  //     : { ...formData, ...inputsObj };
  // });
  // console.log('valueInput', valueInput);
  // governed.EPDR.QBTC_QUSD_collateralizationRatio
  // useEffect(() => {
  //   console.log('formData?.hasOwnProperty', formData?.hasOwnProperty('value'));
  //   console.log('formData', formData);
  //   // if (!formData?.hasOwnProperty('value')) {
  //   changeValueInput({ value: value });
  //   // }
  // }, [value]);

  const refType = useCallback((nameField) => {
    let valueValid = '';
    if (nameField === 'value') {
      valueValid = 'Value not found. Key does not exist yet?';
    }
    return register({
      required: 'Field is required!',
      validate: {
        value: value => value !== 'Value not found. Key does not exist yet?',
      }
      // pattern: {
      //   value: valueValid,
      //   message: 'Entered value does not match to current format'
      // }
    });
  }, []);
  console.log("errors[nameField]?.message", errors["value"]?.message);
  return (
    <div>
      {inputArr?.map((label, i) => {
        const nameField = label.replace(/ /g, '-')
          .toLowerCase();
        // console.log(' valueInput', nameField);
        // console.log(' valueInput[nameField]', valueInput[nameField]);
        console.log(' valueInput[value]', value);
        // let val = valueInput[nameField];
        return (
          <Fragment key={i}>
            {labelsArr ? <Descr>{labelsArr[i]}</Descr> : null}
            <FormInput
              name={nameField}
              onChange={(value) => {
                // const valObg = { [nameField]: value.target.value };
                // changeValueInput({ ...valueInput, ...valObg });
                onChangeInput(value.target.value);
              }}
              value={value}
              placeholder={label}
              ref={refType(nameField)}
              valid={errors[nameField]?.message && "Write value"}
            />
          </Fragment>
        );
      })}
    </div>
  );
}

export default InputGroupParameter;


