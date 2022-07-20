import { useDispatch } from 'react-redux';

import { SlashingProposal } from 'typings/proposals';
import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { onEscrowProposerRemark } from 'store/voting/slashing/actions';

import { required } from 'func/validators';

interface Props {
  proposal: SlashingProposal
}

function ProposerRemarkForm ({ proposal }: Props) {
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: { proposerRemark: '' },
    validators: { proposerRemark: [required] },
    onSubmit: (form) => {
      dispatch(
        onEscrowProposerRemark({ ...form, isAppealConfirmed: proposal.objEscrow.objection.appealConfirmed },
          proposal.contract,
          proposal.id
        )
      );
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
        label="Remark about the objection"
        placeholder="Proposer remark"
      />

      <Button type="submit" style={{ width: '100%' }}>
        Confirm appeal
      </Button>
    </form>
  );
}

export default ProposerRemarkForm;
