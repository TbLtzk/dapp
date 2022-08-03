import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { SlashingProposal } from 'typings/proposals';
import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { onEscrowProposerRemark } from 'store/voting/slashing/actions';

import { required } from 'func/validators';

interface Props {
  proposal: SlashingProposal;
}

function ProposerRemarkForm ({ proposal }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: { proposerRemark: '' },
    validators: { proposerRemark: [required] },
    onSubmit: (form) => {
      dispatch(
        onEscrowProposerRemark(
          { ...form, isAppealConfirmed: proposal.objEscrow.objection.appealConfirmed },
          proposal.contract,
          proposal.id,
          t('CONFIRM_APPEAL_SUCCESS')
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
