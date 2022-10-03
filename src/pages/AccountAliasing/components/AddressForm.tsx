import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { trimString } from '@q-dev/utils';
import styled from 'styled-components';
import { media } from 'styles/media';

import Button from 'ui/Button';
import Input from 'ui/Input';

import { address, required } from 'utils/validators';

const WrapContainer = styled.div`
  margin-top: 10px;
  display: grid;
  align-items: flex-start;
  width: 100%;
  grid-template-columns: 480px max-content;
  gap: 15px;

  ${media.lessThan('medium')} {
    grid-template-columns: 1fr;

    button {
      width: max-content;
    }
  }
`;

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
            hint={`${t('SELECTED_ADDRESS')} ${trimString(selectedAddress)}`}
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
