import React from 'react';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock/CustomBlock';
import Input from 'components/Base/Form/Input';
import ExplorerAddress from 'components/Custom/ExplorerAddress';

import useForm from 'hooks/useForm';

import { WrapContainer } from './styles';

import { address, required } from 'func/validators';

function AddressForm ({ userAddress, onChange }) {
  const form = useForm({
    initialValues: { address: userAddress },
    validators: { address: [required, address] },
    onSubmit: (values) => {
      onChange(values.address);
    }
  });

  return (
    <form noValidate onSubmit={form.submit}>
      <CustomBlock>
        <h5>Current Address:</h5>
        <h4><ExplorerAddress address={userAddress} /></h4>

        <h5>Update address:</h5>
        <WrapContainer>
          <Input {...form.fields.address} />
          <Button
            type="submit"
            disabled={!form.isValid}
            style={{ width: '50px' }}
          >
            <i
              className="mdi mdi-cached"
              style={{ fontSize: '20px' }}
            />
          </Button>
        </WrapContainer>
      </CustomBlock>
    </form>
  );
}

export default AddressForm;
