import { ChangeEvent, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from 'react';

import { isNil, uniqueId } from 'lodash';

import Button from 'ui/Button';

import { InputWrapper } from './styles';

import { useUser } from 'store/user/hooks';

import { LOAD_TYPES } from 'constants/statuses';

type InputProps = InputHTMLAttributes<HTMLInputElement>;
interface Props extends Omit<InputProps, 'onChange' | 'prefix' | 'value'> {
  value: string | number | boolean;
  label?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  max?: string;
  decimals?: number;
  prefix?: ReactNode;
  children?: ReactNode;
  labelTip?: string;
  onChange: (val: string) => void;
}

function Input ({
  value,
  label,
  error,
  type = 'text',
  disabled,
  hint,
  max,
  decimals = 18,
  prefix,
  labelTip,
  children,
  onChange = () => {},
  ...rest
}: Props) {
  const { loadType } = useUser();
  const isDisabled = disabled || loadType !== LOAD_TYPES.loaded;
  const inputId = `input-${uniqueId()}`;

  const handleChange = (e: ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    const numbersRegexp = new RegExp(`^[0-9]{1,50}[.]?[0-9]{0,${decimals}}$`);

    const isNumberValid = value === '' || numbersRegexp.test(value);
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
        <div className="input-label-wrp">
          <label
            htmlFor={inputId}
            className="text-md"
          >
            {label}
          </label>
          {labelTip && (
            <span className="text-sm font-light">
              {labelTip}
            </span>
          )}
        </div>
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
          type={type === 'number' ? 'text' : type}
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
