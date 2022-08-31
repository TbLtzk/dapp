import { useTranslation } from 'react-i18next';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { WrapContainer } from './styles';

import { address, required } from 'utils/validators';

interface Props {
  userAddress: string;
  onChange: (value: string) => void;
}

function AddressForm ({ userAddress, onChange }: Props) {
  const { t } = useTranslation();

  const form = useForm({
    initialValues: { address: userAddress },
    validators: { address: [required, address] },
    onSubmit: (values) => {
      onChange(values.address);
    }
  });

  return (
    <form
      noValidate
      className="block"
      onSubmit={form.submit}
    >
      <p className="text-md color-secondary"> {t('RECIPIENT_ADDRESS')}</p>
      <ExplorerAddress
        iconed
        short
        className="text-xl font-semibold"
        address={userAddress}
      />
      <WrapContainer>
        <Input
          {...form.fields.address}
          label={t('DISPLAY_TIME_LOCKS_FOR_ADDRESS')}
        />
        <Button
          type="submit"
          disabled={!form.isValid}
          className="address-form-button"
        >
          <i
            className="mdi mdi-cached"
            style={{ fontSize: '20px' }}
          />
          <span>{t('REFRESH')}</span>
        </Button>
      </WrapContainer>
    </form>
  );
}

export default AddressForm;
