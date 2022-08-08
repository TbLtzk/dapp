
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Proposal } from 'typings/proposals';

import Button from 'ui/Button';
import RadioGroup from 'ui/RadioGroup';

import useForm from 'hooks/useForm';

import { StyledVoteForm } from './styles';

import { voteForProposal } from 'store/voting/proposals/actions';

import { required } from 'utils/validators';

interface Props {
  proposal: Proposal
}

function VoteForm ({ proposal }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: { vote: '' },
    validators: { vote: [required] },
    onSubmit: (form) => {
      dispatch(
        voteForProposal({
          type: 'basic',
          isVotedFor: form.vote === 'yes',
          proposal
        }, t('VOTE_SUCCESS'))
      );
    }
  });

  return (
    <StyledVoteForm
      noValidate
      $selectedOption={form.values.vote === 'yes' ? 'for' : 'against'}
      onSubmit={form.submit}
    >
      <RadioGroup
        {...form.fields.vote}
        extended
        name="vote"
        options={[
          { label: t('YES'), value: 'yes' },
          { label: t('NO'), value: 'no' },
        ]}
      />

      <Button
        type="submit"
        style={{ width: '100%' }}
        disabled={!form.isValid}
      >
        {t('SUBMIT')}
      </Button>
    </StyledVoteForm>
  );
}

export default VoteForm;
