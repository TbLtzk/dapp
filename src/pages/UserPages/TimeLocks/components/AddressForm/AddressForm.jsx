import React, { useState } from 'react'
import FormInput from 'components/Base/Form/FormInput';
import Button from 'components/Base/Buttons/Button';

import { useForm } from 'react-hook-form';
import { WrapContainer } from '../../styles'

function AddressForm({ setAddressRefresh, address }) {

    const [userAddress, setUserAddress] = useState(address.token)

    const {
        register,
        handleSubmit,
        errors
    } = useForm(); 

    return (
        <WrapContainer>
            <Button
                type="outline"
                title="address"
                width="80px"
                disabled={true}
            />
            <FormInput
                name="token"
                type="string"
                value={userAddress}
                ref={register({
                    required: "Address Required!",
                    pattern: {
                        required: true,
                        value: /^.{42}$/gim,
                        message: "Invalid Address!"
                    }
                })}
                valid={errors?.token?.message}
                onChange={(value) => setUserAddress(value.target.value)}
            />
            <Button
                type="outline"
                title="Refresh"
                width="90px"
                handleButton={handleSubmit(setAddressRefresh)}
            />
        </WrapContainer>
    )
}

export default AddressForm
