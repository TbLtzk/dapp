import RadioGroup from 'components/Base/Form/RadioGroup';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';

import { useCreateProposal } from '../ExpertProposalModal';

import { required } from 'func/validators';

function TypeStep () {
  const { goNext } = useCreateProposal();

  const form = useForm({
    initialValues: { type: '' },
    validators: { type: [required] },
    onSubmit: goNext,
  });

  const typeOptions = [
    {
      value: 'add-a-new-expert',
      label: 'Add a new Expert',
    },
    {
      value: 'remove-a-current-expert',
      label: 'Remove a current Expert',
    },
    {
      value: 'parameter-vote',
      label: 'Parameter Vote',
    },
  ];

  return (
    <ModalStep
      disabled={!form.isValid}
      onNext={form.submit}
    >
      <h2>Please select type of Q Expert Proposal</h2>
      <RadioGroup
        {...form.fields.type}
        name="expert-type"
        options={typeOptions}
      />
    </ModalStep>
  );
}

export default TypeStep;
