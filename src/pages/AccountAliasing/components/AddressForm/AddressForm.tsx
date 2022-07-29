import { useTranslation } from 'react-i18next';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { WrapContainer } from './styles';

import { trimAddress } from 'func/useful';
import { address, required } from 'func/validators';

interface Props {
  selectedAddress: string;
  onSubmit: (value: string) => void;
}

function AddressForm ({ selectedAddress, onSubmit }: Props) {
  const { t } = useTranslation();

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
            label={t('DISPLAY_ALIASES_FOR_ADDRESS')}
            hint={`${t('SELECTED_ADDRESS')} ${trimAddress(selectedAddress)}`}
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
            <span>{t('REFRESH')}</span>
          </Button>
        </WrapContainer>
      </div>
    </form>
  );
}

export default AddressForm;
