import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import Button from 'ui/Button';
import Icon from 'ui/Icon';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setAnnounceNewVotingAgent } from 'store/q-vault/action-creators';

import formTypes from 'constants/form-types';
import { address, required } from 'utils/validators';

const StyledForm = styled.form`
  display: grid;
  gap: 24px;

  .announce-form-submit {
    width: 100%;
  }
`;

function AnnounceForm () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: { address: '' },
    validators: { address: [required, address] },
    onSubmit: (form) => {
      dispatch(setAnnounceNewVotingAgent(form.address, t('ANNOUNCE_NEW_VOTING_AGENT_SUCCESS')));
    }
  });

  useMetamaskReset(formTypes.qVaultAnnounce, form.reset);

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
