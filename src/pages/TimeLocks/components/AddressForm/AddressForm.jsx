import React, { useState } from 'react'
import FormInput from 'components/Base/Form/FormInput'
import Button from 'components/Base/Buttons/Button'

import { useForm } from 'react-hook-form'
import { WrapContainer } from '../../styles'
import CustomBlock from 'components/Base/CustomBlock/CustomBlock'
import { isAddress } from 'func/useful'

function AddressForm ({ setAddressRefresh, userAddress }) {
  const [inputAddress, setInputAddress] = useState(userAddress.address)
  const { register, handleSubmit, errors } = useForm({ mode: 'onChange' })

  return (
        <CustomBlock>
            <h5>Current Address:</h5>
            <h4>{userAddress.address}</h4>
            <h5>Write address:</h5>
            <WrapContainer>
                <FormInput
                    name="address"
                    type="string"
                    color={true}
                    value={inputAddress}
                    ref={register({
                      required: 'Address required!',
                      validate: (address) => (isAddress(address) ? true : 'Incorrect address')
                    })}
                    valid={errors?.address?.message}
                    onChange={(value) => setInputAddress(value.target.value.trim())}
                />
                <div>
                    <Button
                        type="outline"
                        icon="cached"
                        disabled={Boolean(errors?.address?.message)}
                        iconFontSize="20px"
                        width="50px"
                        handleButton={handleSubmit(setAddressRefresh)}
                    />
                </div>
            </WrapContainer>
        </CustomBlock>
  )
}

export default AddressForm
