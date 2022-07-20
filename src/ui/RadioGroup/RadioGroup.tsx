import { HTMLAttributes } from 'react';

import { RadioOptions } from 'typings/forms';
import Radio from 'ui/Radio';

import { RadioGroupContainer } from './styles';

type ValueType = number | string | boolean
interface Props<T extends ValueType> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: T
  name: string
  options?: RadioOptions<T>
  extended?: boolean
  disabled?: boolean
  label?: string
  error?: string
  row?: boolean
  onChange: (value: T) => void
};

function RadioGroup<T extends ValueType> ({
  name,
  value,
  options = [],
  label = '',
  error,
  row = false,
  extended = false,
  disabled = false,
  onChange,
  ...rest
}: Props<T>) {
  return (
    <RadioGroupContainer
      $row={row}
      $extended={extended}
      $disabled={disabled}
      {...rest}
    >
      {label && <p className="radio-group-lbl text-md">{label}</p>}

      <div className="radio-group-options">
        {options.map((option) => (
          <Radio
            key={String(option.value)}
            className="radio-group-option"
            label={option.label}
            name={name}
            value={value}
            checked={option.value === value}
            tip={option.tip}
            extended={extended}
            disabled={disabled}
            onChange={() => onChange(option.value)}
          />
        ))}
      </div>

      {error && (
        <span className="radio-group-error text-md font-light">
          {error}
        </span>
      )}
    </RadioGroupContainer>
  );
}

export default RadioGroup;
