import React, { forwardRef, useState } from 'react'
import { Form } from 'react-bootstrap'

import ErrorInputMessage from 'components/Base/ErrorInputMessage'
import { InputWrapper } from 'components/Base/Form/FormInput/styles'
import { useSelector } from 'react-redux'
import { theme } from 'store/theme/selectors'

const FormInput = forwardRef((props, ref) => {
  // eslint-disable-next-line react/prop-types
  const {
    name,
    type,
    placeholder,
    valid,
    onClick = () => {},
    align,
    onChange,
    value,
    disabled,
    min,
    color,
    onMaxClick = null,
    modal,
    lbl,
    controlId = 'formBasicEmail'
  } = props

  const [isFocus, setIsFocus] = useState('')
  const currentTheme = useSelector(theme)

  return (
        <InputWrapper
            controlId={controlId}
            align={align}
            type={valid ? 'error' : ''}
            palette={currentTheme}
            color={color ? 1 : 0}
            lbl={lbl}
            isfocus={isFocus}
            isdisabled={disabled ? '1' : ''}
            modal={modal ? 1 : 0}
        >
            <div style={{ display: 'flex' }}>
                {lbl ? <div className={'input_lbl'}>{lbl}</div> : null}
                <Form.Control
                    onFocus={() => {
                      setIsFocus('1')
                    }}
                    onBlur={() => {
                      setIsFocus('')
                    }}
                    min={min}
                    type={type}
                    autoComplete="off"
                    onClick={onClick}
                    placeholder={placeholder}
                    name={name}
                    ref={ref}
                    onKeyPress={(e) => {
                      e.key === 'Enter' && e.preventDefault()
                    }}
                    onChange={onChange}
                    value={value}
                    disabled={disabled}
                />
                {!onMaxClick
                  ? null
                  : (
                    <div onClick={onMaxClick} className="input_maxbtn">
                        Max
                    </div>
                    )}
            </div>
            <ErrorInputMessage message={valid} />
        </InputWrapper>
  )
})

export default FormInput
