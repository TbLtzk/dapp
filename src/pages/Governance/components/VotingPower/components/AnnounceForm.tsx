import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

import Button from 'ui/Button';
import Icon from 'ui/Icon';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { useQVault } from 'store/q-vault/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { address, required } from 'utils/validators';

const StyledForm = styled.form`
  display: grid;
  gap: 24px;

  .announce-form-submit {
    width: 100%;
  }
`;

function AnnounceForm ({ onSubmit }: { onSubmit: () => void }) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { announceNewVotingAgent } = useQVault();

  const form = useForm({
    initialValues: { address: '' },
    validators: { address: [required, address] },
    onSubmit: ({ address }) => {
      submitTransaction({
        successMessage: t('ANNOUNCE_NEW_VOTING_AGENT_SUCCESS'),
        submitFn: () => announceNewVotingAgent(address),
        onSuccess: () => onSubmit()
      });
    }
  });

  return (
    <StyledForm noValidate onSubmit={form.submit}>
      <Input
        {...form.fields.address}
        label={t('VOTING_AGENT_ADDRESS')}
        placeholder="0x..."
        prefix={<Icon name="wallet" className="text-xl" />}
      />

      <Button
        type="submit"
        className="announce-form-submit"
        disabled={!form.isValid}
      >
        {t('ANNOUNCE')}
      </Button>
    </StyledForm>
  );
}

export default AnnounceForm;
