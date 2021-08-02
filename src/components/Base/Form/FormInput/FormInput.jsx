import React, { forwardRef, useState } from 'react';
import { Form } from 'react-bootstrap';

import ErrorInputMessage from 'components/Base/ErrorInputMessage';
import { InputWrapper } from 'components/Base/Form/FormInput/styles';
import { useSelector } from 'react-redux';
import { theme } from 'store/selectors/theme';

const FormInput = forwardRef((props, ref) => {
  // eslint-disable-next-line react/prop-types
  const {
    name,
    type,
    placeholder,
    valid,
    align,
    onChange,
    value,
    disabled,
    min,
    palette,
    color,
    lbl
  } = props;

  const [isFocus, setIsFocus] = useState('');
  const currentTheme = useSelector(theme);
  return (
    <InputWrapper
      controlId="formBasicEmail"
      align={align}
      type={Boolean(valid) ? 'error' : ''}
      palette={currentTheme}
      color={Boolean(color) ? 1 : 0}
      lbl={lbl}
      isfocus={isFocus}
      isdisabled={disabled ? '1' : ''}
    >
      <div style={{ display: 'flex' }}>
        {
          lbl ? <div className={'input_lbl'}>{lbl}</div> : null
        }
        <Form.Control
          onFocus={() => {
            setIsFocus('1');
          }}
          onBlur={() => {
            setIsFocus('');
          }}
          min={min}
          type={type}
          step="0.5"
          placeholder={placeholder}
          name={name}
          ref={ref}
          onChange={onChange}
          value={value}
          disabled={disabled}
        />
      </div>
      <ErrorInputMessage message={valid}/>
    </InputWrapper>
  );
});

export default FormInput;
