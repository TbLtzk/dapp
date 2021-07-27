import React, { forwardRef } from 'react'
import FormInput from '../FormInput';
import { AddressWrapper } from './styled.js'
import { useSelector } from 'react-redux';
import { theme } from 'store/selectors/theme';

const FormAddress = forwardRef(({ name, type, value, valid, onChange }, ref) => {
    const currentTheme = useSelector(theme);
    return (
        <AddressWrapper palette={currentTheme}>
            <FormInput
                name={name}
                type={type}
                value={value}
                ref={ref}
                valid={valid}
                onChange={onChange}
            />
        </AddressWrapper>
    )
})

export default FormAddress
