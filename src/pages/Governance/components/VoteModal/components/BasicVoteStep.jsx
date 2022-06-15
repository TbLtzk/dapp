
import RadioGroup from 'components/Base/Form/RadioGroup';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';

import { useVote } from '../VoteModal';

import { required } from 'func/validators';

function BasicVoteStep () {
  const { goNext } = useVote();
  const form = useForm({
    initialValues: { isVotedFor: '' },
    validators: { isVotedFor: [required] },
    onSubmit: goNext,
  });

  const voteOptions = [
    { value: false, label: 'No' },
    { value: true, label: 'Yes' },
  ];

  return (
    <ModalStep
      disabled={!form.isValid}
      onNext={form.submit}
    >
      <h2>Provide a vote for a proposal</h2>
      <h2>Do you vote YES or NO for this proposal?</h2>

      <RadioGroup
        {...form.fields.isVotedFor}
        name="basic-vote"
        options={voteOptions}
      />
    </ModalStep>
  );
}

export default BasicVoteStep;
