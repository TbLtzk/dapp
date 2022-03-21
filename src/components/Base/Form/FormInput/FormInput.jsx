import React, { forwardRef, useState } from 'react'
import { Form } from 'react-bootstrap'

import ErrorInputMessage from 'components/Base/ErrorInputMessage'
import { InputWrapper } from 'components/Base/Form/FormInput/styles'
import { useSelector } from 'react-redux'
import { theme } from 'store/theme/selectors'
import { loadTypeSelector } from 'store/user-inf/selectors'
import { LOAD_TYPES } from 'constants/statuses'

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
  const loadType = useSelector(loadTypeSelector)
  const isDisabled = loadType !== LOAD_TYPES.loaded ? '1' : disabled ? '1' : ''
  const isValid = valid ? 'error' : ''

  return (
        <InputWrapper
            controlId={controlId}
            align={align}
            type={isValid}
            palette={currentTheme}
            color={color ? 1 : 0}
            lbl={lbl}
            isfocus={isValid === 'error' ? '' : isFocus}
            isdisabled={isDisabled}
            modal={modal ? 1 : 0}
        >
            <div>
                {lbl ? <div className="input_lbl">{lbl}</div> : null}
                <Form.Control
                    onFocus={() => setIsFocus('1')}
                    onBlur={() => setIsFocus('')}
                    min={min}
                    type={type}
                    autoComplete="off"
                    onClick={onClick}
                    placeholder={placeholder}
                    name={name}
                    ref={ref}
                    onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
                    onChange={onChange}
                    value={value}
                    disabled={isDisabled}
                />
                {onMaxClick
                  ? (
                    <div className="input_maxbtn" onClick={onMaxClick}>
                        Max
                    </div>
                    )
                  : null}
            </div>
            <ErrorInputMessage message={valid} />
        </InputWrapper>
  )
})

export default FormInput
