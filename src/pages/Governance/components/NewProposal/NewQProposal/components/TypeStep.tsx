import { QProposalForm, RadioOptions } from 'typings/forms';
import RadioGroup from 'ui/RadioGroup';

import { FormStep } from 'components/MultiStepForm';

import useForm from 'hooks/useForm';

import { useNewQProposalForm } from '../NewQProposal';

import { required } from 'func/validators';

function TypeStep () {
  const { goNext, onChange } = useNewQProposalForm();

  const form = useForm({
    initialValues: { type: 'constitution' as QProposalForm['type'] },
    validators: { type: [required] },
    onChange,
    onSubmit: goNext,
  });

  const typeOptions: RadioOptions<QProposalForm['type']> = [
    {
      value: 'constitution',
      label: 'Constitution Update',
      tip: 'Constitution Updates change the underlying agreement upon which the Q system operates.',
    },
    {
      value: 'general',
      label: 'General Q Update',
      tip: 'General Q Updates gather the Community voice on ideas how to shape Q in the future.'
    },
    {
      value: 'emergency',
      label: 'Emergency Update',
      tip: 'Emergency Updates enable Root Nodes to agree on an immediate update for the Q system.'
    }
  ];

  return (
    <FormStep
      disabled={!form.isValid}
      onNext={form.submit}
    >
      <RadioGroup
        {...form.fields.type}
        extended
        name="q-type"
        options={typeOptions}
      />
    </FormStep>
  );
}

export default TypeStep;
