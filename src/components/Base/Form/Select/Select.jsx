import React from 'react';

import ErrorInputMessage from 'components/Base/ErrorInputMessage';

import { SelectWrapper } from './styles';

function Select ({
  value,
  label,
  error,
  disabled,
  defaultValue = '',
  options = [],
  onChange = () => {},
  ...rest
}) {
  return (
    <SelectWrapper
      $error={error}
      $disabled={disabled}
      disabled={disabled}
    >
      {label && <h4>{label}</h4>}
      <div className="select-container">
        <select
          disabled={disabled}
          value={value}
          {...rest}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map(item => (
            <option
              key={item.value}
              value={item.value}
              defaultValue={item.value === defaultValue}
            >
              {item.label}
            </option>
          ))}
        </select>
        <i className="mdi mdi-chevron-down select-icon" />
      </div>
      {error && <ErrorInputMessage message={error} />}
    </SelectWrapper>
  );
};

export default Select;
