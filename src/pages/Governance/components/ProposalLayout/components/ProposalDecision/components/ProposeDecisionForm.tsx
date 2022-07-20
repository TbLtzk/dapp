import { useDispatch } from 'react-redux';

import { SlashingProposal } from 'typings/proposals';
import Button from 'ui/Button';
import Check from 'ui/Check';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { onEscrowProposeDecision } from 'store/voting/slashing/actions';

import { percent, required, url } from 'func/validators';

interface Props {
  proposal: SlashingProposal
}

function ProposeDecisionForm ({ proposal }: Props) {
  const dispatch = useDispatch();
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
      dispatch(onEscrowProposeDecision(form, proposal.contract, proposal.id));
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
        label="Link to external source with decision details"
        placeholder="External Link"
      />

      <Input
        {...form.fields.percentage}
        value={form.values.percentage as string}
        label="Adjusted percentage for slashing"
        placeholder="0-100%"
        max="100"
        disabled={Boolean(form.values.isAppealNeglected)}
      />

      <Check
        {...form.fields.isAppealNeglected}
        value={Boolean(form.values.isAppealNeglected)}
        label="The slashing target neglected a formal appeal"
        onChange={handleAppealNeglectedChange}
      />

      <Button
        type="submit"
        style={{ width: '100%', marginTop: '8px' }}
      >
        Propose decision
      </Button>
    </form>
  );
}

export default ProposeDecisionForm;
