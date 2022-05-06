import React, { forwardRef, useState } from 'react';
import { Form } from 'react-bootstrap';

import PropTypes from 'prop-types';

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
  const [isFocus, setIsFocus] = useState('');
  return (
    <SelectWrapper
      width={width}
      palette={palette}
      isfocus={isFocus}
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
        onFocus={() => {
          setIsFocus('1');
        }}
        onBlur={() => {
          setIsFocus('');
        }}
        onChange={onChange}
      >
        {
          optionValues.map(item => <option key={item.value} value={item.value}>{item.lbl}</option>)
        }
      </Form.Control>
    </SelectWrapper>);
});

FormSelect.propTypes = {
  name: PropTypes.string
};

FormSelect.defaultProps = {
  name: +new Date() + '',
  optionValues: []
};

export default FormSelect;
