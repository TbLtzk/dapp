import Input from 'ui/Input';

import { FormStep } from 'components/MultiStepForm';

import useForm from 'hooks/useForm';

import { useNewRootProposal } from '../NewRootProposal';

import { address, required, url } from 'func/validators';

function RemoveNodeStep () {
  const { goNext, goBack } = useNewRootProposal();

  const form = useForm({
    initialValues: {
      address: '',
      externalLink: ''
    },
    validators: {
      address: [required, address],
      externalLink: [required, url]
    },
    onSubmit: goNext,
  });

  return (
    <FormStep
      disabled={!form.isValid}
      onNext={form.submit}
      onBack={goBack}
    >
      <Input
        {...form.fields.address}
        label="Root Node address"
        placeholder="Address (0x...)"
      />

      <Input
        {...form.fields.externalLink}
        label="Reference link to external source"
        placeholder="Link"
      />
    </FormStep>
  );
}

export default RemoveNodeStep;
