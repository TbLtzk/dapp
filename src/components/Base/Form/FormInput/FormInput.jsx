import React, { forwardRef, useCallback, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import ErrorInputMessage from 'components/Base/ErrorInputMessage';
import { InputWrapper } from 'components/Base/Form/FormInput/styles';

import { theme } from 'store/theme/selectors';
import { loadTypeSelector } from 'store/user-inf/selectors';

import { fieldTypes } from 'constants/fieldTypes';
import { from1to100Regex, hashRegex, linkRegex, numberRegex, vaultID } from 'constants/regex';
import { LOAD_TYPES } from 'constants/statuses';
import { isAddress } from 'func/useful';

const FormInput = forwardRef(({
  refType,
  register,
  setValue,
  name,
  type = 'text',
  placeholder,
  valid,
  onClick = () => {},
  value,
  disabled,
  min,
  color,
  onMaxClick = null,
  modal,
  prefix,
  label,
  onChange,
}, ref) => {
  const [isFocus, setIsFocus] = useState('');

  const currentTheme = useSelector(theme);
  const loadType = useSelector(loadTypeSelector);
  const isDisabled = loadType !== LOAD_TYPES.loaded ? '1' : disabled ? '1' : '';
  const isValid = valid ? 'error' : '';

  const getTypeRef = useCallback(() => {
    switch (refType) {
      case fieldTypes.externalLink: {
        return register({
          required: 'Field is required!',
          validate: (link) => (link.match(linkRegex) ? true : 'Link not valid')
        });
      }
      case fieldTypes.externalLinkOptional: {
        return register({
          validate: (link) => (!link || link.match(linkRegex) ? true : 'Link not valid')
        });
      }
      case fieldTypes.address: {
        return register({
          required: 'Field is required!',
          validate: (address) => (isAddress(address) ? true : 'Address not valid')
        });
      }
      case fieldTypes.vaultId: {
        return register({
          required: 'Field is required!',
          validate: (value) => (value.match(vaultID) ? true : 'Vault ID not valid')
        });
      }
      case fieldTypes.bid: {
        return register({
          required: 'Field is required!',
          validate: (value) => (value.match(numberRegex) ? true : 'Bid not valid')
        });
      }
      case fieldTypes.hash: {
        return register({
          required: 'Field is required!',
          validate: (hash) => (hash.match(hashRegex) ? true : 'Hash not valid')
        });
      }
      case fieldTypes.percentValue: {
        return register({
          required: 'Field is required!',
          validate: (value) => {
            if (Number(value) > 100) {
              setValue(fieldTypes.percentValue, '100');
              return true;
            } else {
              return value.match(from1to100Regex) ? true : 'Percentage value not valid';
            }
          }
        });
      }
      default: {
        return register({
          required: 'Field is required!',
          validate: (value) => (value.length >= 70 ? 'Maximum length reached' : true)
        });
      }
    }
  }, []);

  return (
    <>
      {label ? <h4>{label}</h4> : null}
      <InputWrapper
        type={isValid}
        palette={currentTheme}
        color={color ? 1 : 0}
        prefix={prefix}
        isfocus={valid ? '' : isFocus}
        isdisabled={isDisabled}
        modal={modal ? 1 : 0}
      >
        <div>
          {prefix ? <div className="input__prefix">{prefix}</div> : null}
          <Form.Control
            ref={ref || getTypeRef()}
            min={min}
            type={type}
            autoComplete="off"
            placeholder={placeholder}
            name={name}
            value={value}
            disabled={isDisabled}
            onFocus={() => setIsFocus('1')}
            onBlur={() => setIsFocus('')}
            onClick={onClick}
            onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
            onChange={onChange}
          />
          {onMaxClick
            ? (
              <div className="input__max" onClick={onMaxClick}>
                Max
              </div>
            )
            : null}
        </div>
        <ErrorInputMessage message={valid} />
      </InputWrapper>
    </>
  );
});

export default FormInput;
