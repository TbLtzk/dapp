import React from 'react'
import FormInput from 'components/Base/Form/FormInput';
import Button from 'components/Base/Buttons/Button';

import { useForm } from 'react-hook-form';
import { WrapContainer } from '../../styles'

function AddressForm() {
    const {
        register: reg2,
        handleSubmit: submit2,
        errors: err2
    } = useForm();
    const {
        register: reg3,
        handleSubmit: submit3,
        errors: err3
    } = useForm();

    return (
        <div>
            <WrapContainer className={'card__one-line-form'}>
                <Button
                    type="outline"
                    title="address"
                    width="90px"
                    handleButton={() => console.log('click')}
                />
                <FormInput
                    min={0}
                    name="amountQ"
                    type="string"
                    placeholder="0.0"
                    ref={reg2({
                        required: 'Field is required!',
                        pattern: /[0-9]/i
                    })}
                    valid={err2.amountQ?.message}
                />
                <Button
                    type="outline"
                    title="Refresh"
                    width="90px"
                    handleButton={() => console.log('click')}
                />
            </WrapContainer>
        </div>
    )
}

export default AddressForm
