import { HTMLAttributes } from 'react';

import { uniqueId } from 'lodash';

import { RadioContainer } from './styles';

type ValueType = number | string | boolean
interface Props<T extends ValueType> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  checked: boolean
  value: T
  name: string
  label?: string
  disabled?: boolean
  onChange: (value: T) => void
};

function Radio<T extends ValueType> ({
  checked,
  value,
  name,
  label,
  disabled = false,
  onChange,
  ...rest
}: Props<T>) {
  const inputId = `radio-${uniqueId()}`;

  return (
    <RadioContainer
      $checked={checked}
      $disabled={disabled}
      {...rest}
    >
      <input
        id={inputId}
        className="radio-input"
        type="radio"
        name={name}
        value={String(value)}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(value)}
      />

      <div className="radio-frame">
        <div className="radio-circle" />
      </div>

      <label
        htmlFor={inputId}
        className="radio-label text-md"
      >
        {label}
      </label>
    </RadioContainer>
  );
};

export default Radio;
