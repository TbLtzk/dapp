
import RadioGroup from 'components/Base/Form/RadioGroup';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';

import { useVote } from '../VoteModal';

import { required } from 'func/validators';

function ConstitutionVoteStep () {
  const { goNext } = useVote();
  const form = useForm({
    initialValues: { isVotedFor: false },
    validators: { isVotedFor: [required] },
    onSubmit: goNext,
  });

  return (
    <ModalStep
      disabled={!form.isValid}
      onNext={form.submit}
    >
      <h2>Only Root Node Eligible</h2>
      <h2>Do you consider this proposal breaches constitution?</h2>

      <RadioGroup
        {...form.fields.isVotedFor}
        name="constitution-check-vote"
        options={[{ value: true, label: 'Yes' }]}
      />
    </ModalStep>
  );
}

export default ConstitutionVoteStep;
