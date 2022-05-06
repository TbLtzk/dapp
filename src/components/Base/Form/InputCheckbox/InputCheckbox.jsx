import React, { forwardRef } from 'react';
import { Form } from 'react-bootstrap';

const InputCheckbox = forwardRef((props, ref) => {
  const { label, name, value, checked, handleChange } = props;
  return (
    <Form.Group controlId="formBasicCheckbox">
      <Form.Check
        ref={ref}
        type="checkbox"
        label={label}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
      />
    </Form.Group>
  );
});

export default InputCheckbox;
