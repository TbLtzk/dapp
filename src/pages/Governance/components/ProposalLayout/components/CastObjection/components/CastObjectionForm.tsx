import { useTranslation } from 'react-i18next';

import { Proposal } from 'typings/proposals';

import { useSlashingActions } from 'pages/Governance/hooks/useSlashingActions';
import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { useTransaction } from 'store/transaction/hooks';

import { url } from 'utils/validators';

interface Props {
  proposal: Proposal;
  onSubmit: () => void;
}

function CastObjectionForm ({ proposal, onSubmit }: Props) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { castObjection } = useSlashingActions(proposal.contract === 'rootNodesSlashingVoting');

  const form = useForm({
    initialValues: { externalLink: '' },
    validators: { externalLink: [url] },
    onSubmit: (form) => {
      submitTransaction({
        successMessage: t('CAST_OBJECTION_SUCCESS'),
        onSuccess: () => onSubmit(),
        submitFn: () => castObjection({
          remark: form.externalLink,
          proposalId: proposal.id,
        }),
      });
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
