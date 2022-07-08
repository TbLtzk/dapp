import Button from 'ui/Button';
import Input from 'ui/Input';

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
      <div className="block">
        <WrapContainer>
          <Input
            {...form.fields.address}
            label="Display aliases for address:"
            hint={`Selected address: ${selectedAddress}`}
          />
          <Button
            type="submit"
            disabled={!form.isValid}
            style={{ marginTop: '34px' }}
          >
            <i
              className="mdi mdi-cached"
              style={{ fontSize: '20px' }}
            />
            <span>Refresh</span>
          </Button>
        </WrapContainer>
      </div>
    </form>
  );
}

export default AddressForm;
