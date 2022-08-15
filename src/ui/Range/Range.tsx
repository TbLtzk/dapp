import { HTMLAttributes } from 'react';

import { uniqueId } from 'lodash';

import Input from 'ui/Input';

import { RangeContainer } from './styles';

import { formatNumber, formatPercent, toBigNumber } from 'utils/numbers';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: string
  max?: string
  label?: string
  error?: string
  disabled?: boolean
  hideInput?: boolean
  formatter?: (value: string) => string
  onChange: (value: string, relativeValue: string) => void
};

function Range ({
  value,
  max = '100',
  label,
  error,
  disabled = false,
  hideInput = false,
  formatter = formatNumber,
  onChange,
  ...rest
}: Props) {
  const inputId = `range-${uniqueId()}`;

  const getAbsoluteValue = (val: string) => {
    return toBigNumber(max)
      .multipliedBy(toBigNumber(val || 0))
      .dividedBy(100)
      .toString();
  };

  const handleInputChange = (val: string) => {
    const percent = Number(val) > 100 ? '100' : formatNumber(val, 1) || '0';
    onChange(percent, getAbsoluteValue(val));
  };

  return (
    <RangeContainer
      $disabled={disabled}
      $percent={Number(value) || 0}
      $hideInput={hideInput}
      {...rest}
    >
      <label
        htmlFor={inputId}
        className="range-label text-md"
      >
        {label}
      </label>

      <div className="range-wrapper">
        <div className="range-main">
          <div className="range-values">
            <p className="range-value text-sm">
              <span>{formatter(getAbsoluteValue(value))}</span>
              <span className="font-light">({formatPercent(value || 0)})</span>
            </p>
            <p className="range-value text-sm">
              <span>{formatter(max || '0')}</span>
              <span className="font-light">(100%)</span>
            </p>
          </div>

          <input
            id={inputId}
            className="range-input"
            type="range"
            value={value || 0}
            max="100"
            step={0.1}
            disabled={disabled}
            onChange={(e) => handleInputChange((e.target as HTMLInputElement).value)}
          />
        </div>

        {!hideInput && (
          <Input
            value={value || '0'}
            type="number"
            step={0.1}
            disabled={disabled}
            onChange={handleInputChange}
          >
            %
          </Input>
        )}
      </div>

      {error && (
        <span className="range-error text-md font-light">{error}</span>
      )}
    </RangeContainer>
  );
}

export default Range;
