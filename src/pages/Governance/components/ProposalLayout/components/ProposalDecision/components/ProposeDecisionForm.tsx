import { useTranslation } from 'react-i18next';

import { Check } from '@q-dev/q-ui-kit';
import { SlashingProposal } from 'typings/proposals';

import Button from 'components/Button';
import Input from 'components/Input';
import { useSlashingActions } from 'pages/Governance/hooks/useSlashingActions';

import useForm from 'hooks/useForm';

import { useTransaction } from 'store/transaction/hooks';

import { percent, required, url } from 'utils/validators';

interface Props {
  proposal: SlashingProposal;
  onSubmit: () => void;
}

function ProposeDecisionForm ({ proposal, onSubmit }: Props) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { proposeDecision } = useSlashingActions(proposal.contract === 'rootNodesSlashingVoting');

  const form = useForm({
    initialValues: {
      externalLink: '',
      percentage: '',
      isAppealNeglected: false,
    },
    validators: {
      externalLink: [required, url],
      percentage: [required, percent],
      isAppealNeglected: [],
    },
    onSubmit: (form) => {
      submitTransaction({
        successMessage: t('PROPOSE_DECISION_SUCCESS'),
        onSuccess: () => onSubmit(),
        submitFn: () => proposeDecision({
          externalLink: form.externalLink as string,
          percentage: form.percentage as string,
          isAppealNeglected: form.isAppealNeglected as boolean,
          proposalId: proposal.id,
        })
      });
    },
  });

  const handleAppealNeglectedChange = (val: boolean) => {
    form.fields.isAppealNeglected.onChange(val);
    if (val) {
      form.fields.percentage.onChange('100');
    }
  };

  return (
    <form
      noValidate
      style={{ display: 'grid', gap: '16px' }}
      onSubmit={form.submit}
    >
      <Input
        {...form.fields.externalLink}
        label={t('DECISION_EXTERNAL_LINK')}
        placeholder={t('LINK')}
      />

      <Input
        {...form.fields.percentage}
        value={form.values.percentage as string}
        label={t('ADJUSTED_PERCENTAGE_FOR_SLASHING')}
        placeholder="0-100%"
        max="100"
        disabled={Boolean(form.values.isAppealNeglected)}
      />

      <Check
        {...form.fields.isAppealNeglected}
        value={Boolean(form.values.isAppealNeglected)}
        label={t('SLASHING_TARGET_NEGLECTED_APPEAL')}
        onChange={handleAppealNeglectedChange}
      />

      <Button
        type="submit"
        style={{ width: '100%', marginTop: '8px' }}
      >
        {t('PROPOSE_DECISION_BTN')}
      </Button>
    </form>
  );
}

export default ProposeDecisionForm;
