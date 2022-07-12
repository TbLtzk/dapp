import { ChangeEvent, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { isNil, uniqueId } from 'lodash';
import Button from 'ui/Button';

import { InputWrapper } from './styles';

import { loadTypeSelector } from 'store/user-inf/selectors';

import { LOAD_TYPES } from 'constants/statuses';

type InputProps = InputHTMLAttributes<HTMLInputElement>
interface Props extends Omit<InputProps, 'onChange' | 'prefix' | 'value'> {
  value: string | number | boolean
  label?: string
  error?: string
  hint?: string
  disabled?: boolean
  type?: HTMLInputTypeAttribute
  max?: string
  prefix?: ReactNode
  children?: ReactNode
  onChange: (val: string) => void
}

function Input ({
  value,
  label,
  error,
  type = 'text',
  disabled,
  hint,
  max,
  prefix,
  children,
  onChange = () => {},
  ...rest
}: Props) {
  const loadType = useSelector(loadTypeSelector);
  const isDisabled = disabled || loadType !== LOAD_TYPES.loaded;
  const inputId = `input-${uniqueId()}`;

  const handleChange = (e: ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    const isNumberValid = value === '' || /^[0-9]{1,50}[.]?[0-9]{0,18}$/.test(value);
    if (type === 'number' && !isNumberValid) return;

    onChange(value);
  };

  return (
    <InputWrapper
      $error={error}
      $disabled={isDisabled}
      $type={type}
    >
      {label && (
        <label
          htmlFor={inputId}
          className="text-md"
        >
          {label}
        </label>
      )}

      <div className="input-container">
        {prefix && (
          <div className="input-prefix text-md font-semibold">
            {prefix}
          </div>
        )}
        <input
          id={inputId}
          className="text-md"
          value={String(value)}
          type={type}
          inputMode={type === 'number' ? 'decimal' : 'text'}
          autoComplete="off"
          disabled={isDisabled}
          onChange={handleChange}
          {...rest}
        />

        {children && <div className="input-extra">{children}</div>}
        {!isNil(max) && !children && (
          <Button
            look="ghost"
            disabled={isDisabled}
            className="input-max text-sm font-semibold"
            onClick={() => onChange(max)}
          >
            Max
          </Button>
        )}
      </div>

      {error && (
        <span className="input-error text-md font-light">{error}</span>
      )}

      {hint && !error && (
        <span className="input-hint text-md font-light">{hint}</span>
      )}
    </InputWrapper>
  );
};

export default Input;
