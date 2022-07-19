import { useTranslation } from 'react-i18next';

import Button from 'ui/Button';
import Input from 'ui/Input';

import CustomBlock from 'components/Base/CustomBlock/CustomBlock';

import useForm from 'hooks/useForm';

import { WrapContainer } from './styles';

import { address, required } from 'func/validators';

function AddressForm ({ userAddress, onChange }) {
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
            hint={`${t('SELECTED_ADDRESS')}: ${userAddress}`}
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
