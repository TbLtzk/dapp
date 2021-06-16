import React, { forwardRef, useState } from 'react';
import { SelectWrapper } from './styles';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

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
    palette,
  } = props;
  const [isFocus, setIsFocus] = useState('');
  return (
    <SelectWrapper
      width={width}
      palette={palette}
      isfocus={isFocus}
      type={Boolean(valid) ? 'error' : ''}
      isdisabled={disabled ? '1' : ''}
      disabled={disabled}
    >
      <Form.Control
        name={name}
        onFocus={() => {
          setIsFocus('1');
        }}
        onBlur={() => {
          setIsFocus('');
        }}
        as="select"
        disabled={disabled}
        onChange={onChange}
        defaultValue={defaultValue}
        value={value}
        ref={ref}
      >
        {
          optionValues.map(item => <option key={item.value} value={item.value}>{item.lbl}</option>)
        }
      </Form.Control>
    </SelectWrapper>);
});

FormSelect.propTypes = {
  name: PropTypes.string,
};

FormSelect.defaultProps = {
  name: +new Date() + '',
  optionValues: [],
};

export default FormSelect;
