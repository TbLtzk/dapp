
import { SelectHTMLAttributes } from 'react';

import ErrorInputMessage from 'components/Base/ErrorInputMessage';

import { SelectWrapper } from './styles';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>
interface Props<T extends string> extends Omit<SelectProps, 'onChange'> {
  value: string
  error?: string
  label?: string
  disabled?: boolean
  invertedColors?: boolean
  defaultValue?: T
  options: { value: T, label: string }[]
  onChange: (val: T) => void
}

function Select<T extends string> ({
  value,
  error,
  label,
  disabled,
  defaultValue,
  invertedColors = false,
  options = [],
  onChange,
  ...rest
}: Props<T>) {
  return (
    <SelectWrapper
      $error={error}
      $disabled={disabled}
      $invertedColors={invertedColors}
      disabled={disabled}
    >
      {label && <h4>{label}</h4>}
      <div className="select-container">
        <select
          disabled={disabled}
          value={value}
          {...rest}
          onChange={(e) => onChange(e.target?.value as T)}
        >
          {options.map(item => (
            <option
              key={item.value}
              value={item.value}
              defaultValue={defaultValue}
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
