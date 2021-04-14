import React, { forwardRef } from 'react';
import { Form } from 'react-bootstrap';

import ErrorInputMessage from 'components/Base/ErrorInputMessage';
import { InputWrapper } from 'components/Base/Form/FormInput/styles';

const FormInput = forwardRef((props, ref) => {
  // eslint-disable-next-line react/prop-types
  const { name, type, placeholder, valid, align, onChange, value, disabled, min } = props;
  return (
    <InputWrapper
      controlId="formBasicEmail"
      align={align}
    >
      <Form.Control
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
      <ErrorInputMessage message={valid} />
    </InputWrapper>
  );
});

export default FormInput;
