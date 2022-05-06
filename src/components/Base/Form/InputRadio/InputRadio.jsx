import React, { forwardRef } from 'react';
import { Form } from 'react-bootstrap';

import { RadioBtn } from './styles';

const InputRadio = forwardRef(({ active, label, name, value, checked, handleChange }, ref) => {
  return (
    <Form.Group controlId={value} style={{ padding: 0 }}>
      <RadioBtn
        ref={ref}
        active={Number(active)}
        type="radio"
        label={label}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
      />
    </Form.Group>
  );
});

export default InputRadio;
