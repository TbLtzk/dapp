import React from 'react';
import { useForm } from 'react-hook-form';

import Button from 'components/Base/Buttons/Button';
import CustomBlock from 'components/Base/CustomBlock/CustomBlock';
import FormInput from 'components/Base/Form/FormInput';
import ExplorerAddress from 'components/Custom/ExplorerAddress';

import { WrapContainer } from '../../styles';

import { isAddress } from 'func/useful';

function AddressForm ({ userAddress, setAddressRefresh }) {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
    defaultValues: {
      address: userAddress,
    },
  });

  return (
    <CustomBlock>
      <h5>Current Address:</h5>
      <h4>
        <ExplorerAddress address={userAddress} />
      </h4>
      <h5>Update address:</h5>
      <WrapContainer>
        <FormInput
          ref={register({
            required: 'Address required!',
            validate: (address) => (isAddress(address) ? true : 'Incorrect address'),
          })}
          name="address"
          type="string"
          color={true}
          valid={errors?.address?.message}
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
  );
}

export default AddressForm;
