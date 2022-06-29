import { HTMLAttributes, useEffect, useState } from 'react';

import { Options } from 'typings/forms';
import Button from 'ui/Button';
import Dropdown from 'ui/Dropdown';
import Icon from 'ui/Icon';
import Input from 'ui/Input';

import { SelectContainer } from './styles';

type ValueType = number | string | boolean
interface Props<T extends ValueType> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string | number | boolean
  options: Options<T>
  label?: string
  error?: string
  disabled?: boolean
  chips?: boolean
  placeholder?: string
  hint?: string
  onChange: (val: T) => void
}

function Select<T extends ValueType> ({
  value,
  options,
  label,
  error,
  chips = false,
  disabled = false,
  placeholder,
  hint,
  onChange,
  ...rest
}: Props<T>) {
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(false);

  const selectedOption = options.find(option => value && option.value === value);
  const filteredOptions = options.filter(option => option.label.toLowerCase().includes(filter.toLowerCase()));

  useEffect(() => {
    setFilter('');
  }, [value, open]);

  const selectOption = (val: T) => {
    onChange(val);
    setOpen(false);
    setFilter('');
  };

  const selectTrigger = chips
    ? (
      <Button
        compact
        className={`select-chips ${value ? 'active' : ''}`}
        disabled={disabled}
        look={value ? 'primary' : 'secondary'}
      >
        {Boolean(value) && <Icon name="check" />}
        <span>{selectedOption?.label || placeholder}</span>
        <Icon className="select-icon" name="arrow-down" />
      </Button>
    )
    : (
      <Input
        value={open ? filter : selectedOption?.label || ''}
        label={label}
        error={error}
        hint={hint}
        placeholder={open ? selectedOption?.label || placeholder : placeholder}
        disabled={disabled}
        onClick={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        onChange={setFilter}
      >
        <button
          className="select-arrow"
          type="button"
          disabled={disabled}
          onClick={() => setOpen(!open)}
        >
          <Icon
            className="select-icon"
            name="expand-more"
          />
        </button>
      </Input>
    );

  return (
    <SelectContainer
      $open={open}
      $disabled={disabled}
      {...rest}
    >
      <Dropdown
        open={open}
        fullWidth={!chips}
        disabled={chips ? disabled : true}
        trigger={selectTrigger}
        onToggle={setOpen}
      >
        <div className="select-options">
          {filteredOptions.map((option) => (
            <button
              key={String(option.value)}
              type="button"
              className={`select-option typo-p-md ${value === option.value ? 'active' : ''}`}
              onClick={() => selectOption(option.value)}
            >
              <Icon
                name="check"
                className={`select-option-icon ${value === option.value ? 'active' : ''}`}
              />
              <span>{option.label}</span>
            </button>
          ))}

          {filteredOptions.length === 0 && (
            <p className="select-stub typo-p-md">
              No options found
            </p>
          )}
        </div>
      </Dropdown>
    </SelectContainer>
  );
};

export default Select;
