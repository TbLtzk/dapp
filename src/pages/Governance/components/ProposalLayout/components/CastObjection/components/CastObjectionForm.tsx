import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Proposal } from 'typings/proposals';
import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { onEscrowCastObjection } from 'store/voting/slashing/actions';

import { url } from 'func/validators';

interface Props {
  proposal: Proposal
}

function CastObjectionForm ({ proposal }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: { externalLink: '' },
    validators: { externalLink: [url] },
    onSubmit: (form) => {
      dispatch(onEscrowCastObjection(form, proposal.contract, proposal.id));
    }
  });

  return (
    <form
      noValidate
      style={{ display: 'grid', gap: '24px' }}
      onSubmit={form.submit}
    >
      <Input
        {...form.fields.externalLink}
        label={t('LINK_TO_EXTERNAL_SOURCE_WITH_OBJECTION_DETAILS')}
        placeholder={t('LINK')}
      />

      <Button type="submit" style={{ width: '100%' }}>
        {t('SUBMIT_OBJECTION')}
      </Button>
    </form>
  );
}

export default CastObjectionForm;
