import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setAnnounceNewVotingAgent } from 'store/q-vault/action-creators';

import formTypes from 'constants/form-types';
import { address, required } from 'func/validators';

function AnnounceForm () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: { address: '' },
    validators: { address: [required, address] },
    onSubmit: (form) => {
      dispatch(setAnnounceNewVotingAgent(form.address));
    }
  });
  useMetamaskReset(formTypes.qVaultAnnounce, form.reset);

  return (
    <form noValidate onSubmit={form.submit}>
      <h3>{t('ANNOUNCE_NEW_VOTING_AGENT')}</h3>
      <div className="card__one-line-simple-form">
        <Input
          {...form.fields.address}
          label={t('ADDRESS')}
          placeholder="0x000"
          hint={t('THIS_WILL_IMMEDIATELY_REDUCE_VOTING_WEIGHT')}
        />
        <Button
          type="submit"
          className="form-action"
          style={{ width: '90px' }}
          disabled={!form.isValid}
        >
          {t('ANNOUNCE')}
        </Button>
      </div>
    </form>
  );
}

export default AnnounceForm;
