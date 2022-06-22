
import { Options, QProposalForm } from 'typings/forms';

import RadioGroup from 'components/Base/Form/RadioGroup';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';

import { useCreateProposal } from '../QProposalModal';

import { required } from 'func/validators';

function TypeStep () {
  const { goNext } = useCreateProposal();

  const form = useForm({
    initialValues: { type: 'constitution' as QProposalForm['type'] },
    validators: { type: [required] },
    onSubmit: goNext,
  });

  const typeOptions: Options<QProposalForm['type']> = [
    {
      value: 'constitution',
      label: 'Constitution Update',
    },
    {
      value: 'general',
      label: 'General Q Update',
    },
    {
      value: 'emergency',
      label: 'Emergency Update'
    }
  ];

  return (
    <ModalStep
      disabled={!form.isValid}
      onNext={form.submit}
    >
      <h2>Please select type of Q Proposal</h2>
      <RadioGroup
        {...form.fields.type}
        name="q-type"
        options={typeOptions}
      />
    </ModalStep>
  );
}

export default TypeStep;
