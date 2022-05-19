import React, { forwardRef } from 'react';
import { Form } from 'react-bootstrap';

import { SelectWrapper } from './styles';

const FormSelect = forwardRef((props, ref) => {
  const {
    width,
    name,
    valid,
    disabled,
    onChange,
    defaultValue,
    optionValues,
    value,
    palette
  } = props;

  return (
    <SelectWrapper
      width={width}
      palette={palette}
      type={valid ? 'error' : ''}
      isdisabled={disabled ? '1' : ''}
      disabled={disabled}
    >
      <Form.Control
        ref={ref}
        name={name}
        as="select"
        disabled={disabled}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      >
        {
          optionValues.map(item => <option key={item.value} value={item.value}>{item.lbl}</option>)
        }
      </Form.Control>
    </SelectWrapper>);
});

export default FormSelect;
