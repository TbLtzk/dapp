import { ExpertProposalForm, RadioOptions } from 'typings/forms';
import RadioGroup from 'ui/RadioGroup';

import { FormStep } from 'components/MultiStepForm';

import useForm from 'hooks/useForm';

import { useNewExpertProposal } from '../NewExpertProposal';

import { required } from 'func/validators';

function TypeStep () {
  const { goNext, onChange } = useNewExpertProposal();

  const form = useForm({
    initialValues: { type: 'add-expert' as ExpertProposalForm['type'] },
    validators: { type: [required] },
    onChange,
    onSubmit: goNext,
  });

  const typeOptions: RadioOptions<ExpertProposalForm['type']> = [
    {
      value: 'add-expert',
      label: 'Add a new Expert',
      tip: 'Propose a Q account address to become a member of the selected Expert Panel'
    },
    {
      value: 'remove-expert',
      label: 'Remove a current Expert',
      tip: 'Initiate voting to remove particular member from one of the Expert Panels'
    },
    {
      value: 'parameter-vote',
      label: 'Parameter Vote',
      tip: 'Propose a change of specific parameter managed by the Expert Panel you are belonging to'
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
        name="expert-type"
        options={typeOptions}
      />
    </FormStep>
  );
}

export default TypeStep;
