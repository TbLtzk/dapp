import React, { useState } from 'react'
import FormInput from 'components/Base/Form/FormInput';
import Button from 'components/Base/Buttons/Button';

import { useForm } from 'react-hook-form';
import { WrapContainer } from '../../styles'
import { useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';

function AddressForm({setAddressRefresh}) {
    const address = useSelector(userAddressMetamask);
    const [userAddress, setUserAddress] = useState(address)

    const {
        register: reg2,
        handleSubmit: submitAddressRefresh,
        errors: err2
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
                name="amountQ"
                type="string"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
                // ref={reg2({
                //     required: 'Check address!',
                //     pattern: /^.{42}$/gim
                // })}
            />
            <Button
                type="outline"
                title="Refresh"
                width="90px"
                handleButton={() => submitAddressRefresh(setAddressRefresh(userAddress))}
            />
        </WrapContainer>
    )
}

export default AddressForm
