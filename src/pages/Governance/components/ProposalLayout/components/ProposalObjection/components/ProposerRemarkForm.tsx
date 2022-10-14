import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { SlashingProposal } from 'typings/proposals';

import Button from 'components/Button';
import Input from 'components/Input';
import { useSlashingActions } from 'pages/Governance/hooks/useSlashingActions';

import { useTransaction } from 'store/transaction/hooks';

import { required } from 'utils/validators';

interface Props {
  proposal: SlashingProposal;
  onSubmit: () => void;
}

function ProposerRemarkForm ({ proposal, onSubmit }: Props) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { proposeRemark } = useSlashingActions(proposal.contract === 'rootNodesSlashingVoting');

  const form = useForm({
    initialValues: { proposerRemark: '' },
    validators: { proposerRemark: [required] },
    onSubmit: (form) => {
      submitTransaction({
        successMessage: t('CONFIRM_APPEAL_SUCCESS'),
        onSuccess: () => onSubmit(),
        submitFn: () => proposeRemark({
          remark: form.proposerRemark,
          isAppealConfirmed: proposal.objEscrow.objection.appealConfirmed,
          proposalId: proposal.id,
        })
      });
    },
  });

  return (
    <form
      noValidate
      style={{ display: 'grid', gap: '24px' }}
      onSubmit={form.submit}
    >
      <Input
        {...form.fields.proposerRemark}
        label={t('REMARK_ABOUT_THE_OBJECTION')}
        placeholder={t('PROPOSER_REMARK_LBL')}
      />

      <Button type="submit" style={{ width: '100%' }}>
        {t('CONFIRM_APPEAL')}
      </Button>
    </form>
  );
}

export default ProposerRemarkForm;
