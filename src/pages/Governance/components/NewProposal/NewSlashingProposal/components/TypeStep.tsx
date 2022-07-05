import { RadioOptions, SlashingProposalForm } from 'typings/forms';
import RadioGroup from 'ui/RadioGroup';

import { FormStep } from 'components/MultiStepForm';

import useForm from 'hooks/useForm';

import { useNewSlashingProposal } from '../NewSlashingProposal';

import { required } from 'func/validators';

function TypeStep () {
  const { goNext, onChange } = useNewSlashingProposal();

  const form = useForm({
    initialValues: { type: 'root-slashing' as SlashingProposalForm['type'] },
    validators: { type: [required] },
    onChange,
    onSubmit: goNext,
  });

  const typeOptions: RadioOptions<SlashingProposalForm['type']> = [
    {
      value: 'root-slashing',
      label: 'Root Node Slashing',
      tip: 'Initiates the voting on the slashing of a root node. Can be created by any Q token holder.'
    },
    {
      value: 'validator-slashing',
      label: 'Validator Node Slashing',
      tip: 'Initiates the voting on the slashing of a validator node. Can be created only by root nodes.'
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
        name="slashing-type"
        options={typeOptions}
      />
    </FormStep>
  );
}

export default TypeStep;
