import { Classification } from '@q-dev/q-js-sdk';
import { QProposalForm, RadioOptions } from 'typings/forms';
import Input from 'ui/Input';
import RadioGroup from 'ui/RadioGroup';

import { FormStep } from 'components/MultiStepForm';

import useForm from 'hooks/useForm';

import { useNewQProposalForm } from '../NewQProposal';

import { hash, required, url } from 'func/validators';

function ConstitutionStep () {
  const { goNext, goBack } = useNewQProposalForm();

  const form = useForm({
    initialValues: {
      classification: Classification.FUNDAMENTAL,
      hash: '',
      externalLink: ''
    },
    validators: {
      classification: [required],
      hash: [required, hash],
      externalLink: [required, url],
    },
    onSubmit: (form) => {
      goNext(form as QProposalForm);
    },
  });

  const partOptions: RadioOptions<Classification> = [
    {
      value: Classification.FUNDAMENTAL,
      label: 'Fundamental Part',
      tip: '(Preamble)'
    },
    {
      value: Classification.BASIC,
      label: 'Basic Part',
      tip: '(Main Body and Definitions)'
    },
    {
      value: Classification.DETAILED,
      label: 'Detailed Part',
      tip: '(Selected Appendices)'
    },
  ];

  return (
    <FormStep
      disabled={!form.isValid}
      onNext={form.submit}
      onBack={goBack}
    >
      <RadioGroup
        {...form.fields.classification}
        label="Part of the constitution that is affected"
        name="constition-part"
        options={partOptions}
      />

      <Input
        {...form.fields.hash}
        label="New constitution hash"
        placeholder="Hash"
      />

      <Input
        {...form.fields.externalLink}
        label="Reference link to external source"
        placeholder="Link"
      />
    </FormStep>
  );
}

export default ConstitutionStep;
