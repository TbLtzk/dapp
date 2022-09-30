import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import styled from 'styled-components';

import { useTimeLocksAddress } from 'pages/TimeLocks/TimeLocks';
import Button from 'ui/Button';
import Input from 'ui/Input';

import { address, required } from 'utils/validators';

const StyledForm = styled.form`
  display: grid;
  gap: 24px;

  .address-form-btn {
    width: 100%;
  }
`;

function AddressForm ({ onSubmit }: { onSubmit: () => void }) {
  const { t } = useTranslation();
  const { address: locksAddress, setAddress } = useTimeLocksAddress();

  const form = useForm({
    initialValues: { address: locksAddress },
    validators: { address: [required, address] },
    onSubmit: (values) => {
      setAddress(values.address);
      onSubmit();
    }
  });

  return (
    <StyledForm
      noValidate
      onSubmit={form.submit}
    >
      <Input
        {...form.fields.address}
        label={t('DISPLAY_TIME_LOCKS_FOR_ADDRESS')}
      />

      <Button
        type="submit"
        className="address-form-btn"
        disabled={!form.isValid}
      >
        {t('UPDATE')}
      </Button>
    </StyledForm>
  );
}

export default AddressForm;
