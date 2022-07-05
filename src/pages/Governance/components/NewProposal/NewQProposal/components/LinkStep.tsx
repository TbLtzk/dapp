import Input from 'ui/Input';

import { FormStep } from 'components/MultiStepForm';

import useForm from 'hooks/useForm';

import { useNewQProposalForm } from '../NewQProposal';

import { required, url } from 'func/validators';

function LinkStep () {
  const { goNext, goBack } = useNewQProposalForm();

  const form = useForm({
    initialValues: { externalLink: '' },
    validators: { externalLink: [required, url] },
    onSubmit: goNext,
  });

  return (
    <FormStep
      disabled={!form.isValid}
      onNext={form.submit}
      onBack={goBack}
    >
      <Input
        {...form.fields.externalLink}
        label="Reference link to external source"
        placeholder="Link"
      />
    </FormStep>
  );
}

export default LinkStep;
