import React, { forwardRef, useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import ErrorInputMessage from 'components/Base/ErrorInputMessage';
import { InputWrapper } from 'components/Base/Form/FormInput/styles';

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
  error,
  onClick = () => {},
  value,
  disabled,
  min,
  color,
  modal,
  prefix,
  label,
  onChange,
  onMaxClick = null,
}, ref) => {
  const loadType = useSelector(loadTypeSelector);
  const isDisabled = disabled || loadType !== LOAD_TYPES.loaded;

  const getTypeRef = useCallback(() => {
    switch (refType) {
      case fieldTypes.externalLink: {
        return register({
          required: 'Please, fill the field',
          validate: (link) => (link.match(linkRegex) ? true : 'Invalid link URL')
        });
      }
      case fieldTypes.externalLinkOptional: {
        return register({
          validate: (link) => (!link || link.match(linkRegex) ? true : 'Invalid link URL')
        });
      }
      case fieldTypes.address: {
        return register({
          required: 'Please, fill the field',
          validate: (address) => (isAddress(address) ? true : 'Invalid address')
        });
      }
      case fieldTypes.vaultId: {
        return register({
          required: 'Please, fill the field',
          validate: (value) => (value.match(vaultID) ? true : 'Invalid vault ID')
        });
      }
      case fieldTypes.bid: {
        return register({
          required: 'Please, fill the field',
          validate: (value) => (value.match(numberRegex) ? true : 'Invalid bid')
        });
      }
      case fieldTypes.hash: {
        return register({
          required: 'Please, fill the field',
          validate: (hash) => (hash.match(hashRegex) ? true : 'Invalid hash')
        });
      }
      case fieldTypes.percentValue: {
        return register({
          required: 'Please, fill the field',
          validate: (value) => {
            if (Number(value) > 100) {
              setValue(fieldTypes.percentValue, '100');
              return true;
            } else {
              return value.match(from1to100Regex) ? true : 'Invalid percentage value';
            }
          }
        });
      }
      default: {
        return register({
          required: 'Please, fill the field',
          validate: (value) => (value.length >= 70 ? 'Maximum length reached' : true)
        });
      }
    }
  }, []);

  return (
    <InputWrapper
      $color={color}
      $prefix={prefix}
      $error={error}
      $disabled={isDisabled}
      $modal={modal}
    >
      {label ? <h4>{label}</h4> : null}
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
          onClick={onClick}
          onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
          onChange={onChange}
        />
        {onMaxClick
          ? (
            <button className="input__max" onClick={onMaxClick}>
              Max
            </button>
          )
          : null}
      </div>
      <ErrorInputMessage message={error} />
    </InputWrapper>
  );
});

export default FormInput;
