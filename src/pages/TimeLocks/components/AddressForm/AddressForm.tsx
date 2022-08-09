import { useTranslation } from 'react-i18next';

import CustomBlock from 'components/Base/CustomBlock/CustomBlock';
import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { WrapContainer } from './styles';

import { trimAddress } from 'utils/strings';
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
    <form noValidate onSubmit={form.submit}>
      <CustomBlock>
        <WrapContainer>
          <Input
            {...form.fields.address}
            label={t('DISPLAY_TIME_LOCKS_FOR_ADDRESS')}
            hint={`${t('SELECTED_ADDRESS')}: ${trimAddress(userAddress)}`}
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
      </CustomBlock>
    </form>
  );
}

export default AddressForm;
