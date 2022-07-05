import { RadioOptions, RootNodeProposalForm } from 'typings/forms';
import RadioGroup from 'ui/RadioGroup';

import { FormStep } from 'components/MultiStepForm';

import useForm from 'hooks/useForm';

import { useNewRootProposal } from '../NewRootProposal';

import { required } from 'func/validators';

function TypeStep () {
  const { goNext, onChange } = useNewRootProposal();

  const form = useForm({
    initialValues: { type: 'add-root-node' as RootNodeProposalForm['type'] },
    validators: { type: [required] },
    onChange,
    onSubmit: goNext,
  });

  const typeOptions: RadioOptions<RootNodeProposalForm['type']> = [
    {
      value: 'add-root-node',
      label: 'Add a new Root Node',
      tip: 'Add your account as a candidate for the Root Node Panel. Optionally provide a Root Node to remove.',
    },
    {
      value: 'remove-root-node',
      label: 'Remove a current Root Node',
      tip: 'Initiate a vote about the removal of a specific Root Node from the Root Node Panel',
    },
  ];

  return (
    <FormStep
      disabled={!form.isValid}
      onNext={form.submit}
    >
      <RadioGroup
        {...form.fields.type}
        extended
        name="root-node-type"
        options={typeOptions}
      />
    </FormStep>
  );
}

export default TypeStep;
