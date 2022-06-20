import { ChangeEvent, HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { isNil } from 'lodash';

import ErrorInputMessage from 'components/Base/ErrorInputMessage';

import { InputWrapper } from './styles';

import { loadTypeSelector } from 'store/user-inf/selectors';

import { LOAD_TYPES } from 'constants/statuses';

type InputProps = InputHTMLAttributes<HTMLInputElement>
interface Props extends Omit<InputProps, 'onChange' | 'prefix' | 'value'> {
  value: string | number | boolean
  error?: string
  label?: string
  disabled?: boolean
  prefix?: ReactNode
  invertedColors?: boolean
  type?: HTMLInputTypeAttribute
  max?: string
  onChange: (val: string) => void
}

const Input = ({
  value,
  label,
  error,
  disabled,
  prefix,
  invertedColors,
  type = 'text',
  max,
  onChange = () => {},
  ...rest
}: Props) => {
  const loadType = useSelector(loadTypeSelector);
  const isDisabled = disabled || loadType !== LOAD_TYPES.loaded;

  const handleChange = (e: ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    const isNumberValid = value === '' || /^[0-9]{1,50}[.]?[0-9]{0,18}$/.test(value);
    if (type === 'number' && !isNumberValid) return;

    onChange(value);
  };

  return (
    <InputWrapper
      $prefix={prefix}
      $error={error}
      $disabled={isDisabled}
      $invertedColors={invertedColors}
      $type={type}
    >
      {label && <h4>{label}</h4>}
      <div className="input__container">
        {prefix && <div className="input__prefix">{prefix}</div>}
        <input
          className="form-control"
          value={String(value)}
          type={type}
          inputMode={type === 'number' ? 'decimal' : 'text'}
          autoComplete="off"
          disabled={isDisabled}
          onChange={handleChange}
          {...rest}
        />
        {!isNil(max) && (
          <button
            disabled={isDisabled}
            className="input__max"
            type="button"
            onClick={() => onChange(max)}
          >
            Max
          </button>
        )}
      </div>
      {error && <ErrorInputMessage message={error} />}
    </InputWrapper>
  );
};

export default Input;
