import React, { useState } from 'react'
import FormInput from 'components/Base/Form/FormInput'
import Button from 'components/Base/Buttons/Button'

import { useForm } from 'react-hook-form'
import { WrapContainer } from '../../styles'

function AddressForm ({ setAddressRefresh, userAddress }) {
  const [inputAddress, setInputAddress] = useState(userAddress.address)

  const {
    register,
    handleSubmit,
    errors
  } = useForm()

  return (
        <WrapContainer>
            <FormInput
                name="address"
                type="string"
                lbl="Address"
                color={true}
                value={inputAddress}
                ref={register({
                  required: 'Address Required!',
                  pattern: {
                    required: true,
                    value: /^.{42}$/gim,
                    message: 'Invalid Address!'
                  }
                })}
                valid={errors?.token?.message}
                onChange={(value) => setInputAddress(value.target.value.trim())}
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
