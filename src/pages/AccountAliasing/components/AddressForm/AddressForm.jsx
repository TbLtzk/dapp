import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock/CustomBlock';
import Input from 'components/Base/Form/Input';

import useForm from 'hooks/useForm';

import { WrapContainer } from './styles';

import { address, required } from 'func/validators';

function AddressForm ({ selectedAddress, onSubmit }) {
  const form = useForm({
    initialValues: { address: selectedAddress },
    validators: { address: [required, address] },
    onSubmit: (form) => {
      onSubmit(form.address);
    }
  });

  return (
    <form noValidate onSubmit={form.submit}>
      <CustomBlock>
        <h5>Display aliases for address:</h5>
        <WrapContainer>
          <Input {...form.fields.address} />
          <Button
            type="submit"
            disabled={!form.isValid}
          >
            <i className="mdi mdi-refresh" />
            <span>Refresh</span>
          </Button>
        </WrapContainer>
      </CustomBlock>
    </form>
  );
}

export default AddressForm;
