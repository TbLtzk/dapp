
import RadioGroup from 'components/Base/Form/RadioGroup';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';

import { useCreateProposal } from '../RootProposalModal';

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
      value: 'add-a-new-root-node',
      label: 'Add a new Root Node',
    },
    {
      value: 'remove-a-current-root-node',
      label: 'Remove a current Root Node',
    },
  ];

  return (
    <ModalStep
      disabled={!form.isValid}
      onNext={form.submit}
    >
      <h2>Please select type of Q Root Node Panel Proposal</h2>
      <RadioGroup
        {...form.fields.type}
        name="root-node-type"
        options={typeOptions}
      />
    </ModalStep>
  );
}

export default TypeStep;
