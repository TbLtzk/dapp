import React, { forwardRef, useState } from 'react';
import { Form } from 'react-bootstrap';

import ErrorInputMessage from 'components/Base/ErrorInputMessage';
import { InputWrapper } from 'components/Base/Form/FormInput/styles';

const FormInput = forwardRef((props, ref) => {
  // eslint-disable-next-line react/prop-types
  const {
    name,
    type,
    placeholder,
    valid,
    align,
    onChange,
    value,
    disabled,
    min,
    palette,
    lbl
  } = props;

  const [isFocus, setIsFocus] = useState('');
  return (
    <InputWrapper
      controlId="formBasicEmail"
      align={align}
      type={Boolean(valid) ? 'error' : ''}
      palette={palette}
      lbl={lbl}
      isfocus={isFocus}
      isdisabled={disabled ? '1' : ''}
    >
      <div style={{ display: 'flex' }}>
        {
          lbl ? <div className={'input_lbl'}>{lbl}</div> : null
        }
        <Form.Control
          onFocus={() => {
            setIsFocus('1');
          }}
          onBlur={() => {
            setIsFocus('');
          }}
          min={min}
          type={type}
          step="0.5"
          placeholder={placeholder}
          name={name}
          ref={ref}
          onChange={onChange}
          value={value}
          disabled={disabled}
        />
      </div>
      <ErrorInputMessage message={valid}/>
    </InputWrapper>
  );
});

export default FormInput;
