import React, { useState } from 'react'
import FormInput from 'components/Base/Form/FormInput'
import Button from 'components/Base/Buttons/Button'

import { useForm } from 'react-hook-form'
import { WrapContainer } from '../../styles'
import CustomBlock from 'components/Base/CustomBlock/CustomBlock'

function AddressForm ({ setAddressRefresh, userAddress }) {
  const [inputAddress, setInputAddress] = useState(userAddress.address)

  const { register, handleSubmit, errors } = useForm()

  return (
        <CustomBlock>
            <h5>Current address:</h5>
            <h4>{userAddress.address}</h4>
            <h4>Address</h4>
            <WrapContainer>
                <FormInput
                    name="address"
                    type="string"
                    color={true}
                    value={inputAddress}
                    ref={register({
                      required: 'Address required!',
                      pattern: {
                        required: true,
                        value: /^.{42}$/gim,
                        message: 'Invalid address!'
                      }
                    })}
                    valid={errors?.token?.message}
                    onChange={(value) => setInputAddress(value.target.value.trim())}
                />
                <Button
                    type="outline"
                    icon="cached"
                    iconFontSize="20px"
                    width="50px"
                    handleButton={handleSubmit(setAddressRefresh)}
                />
            </WrapContainer>

        </CustomBlock>
  )
}

export default AddressForm
