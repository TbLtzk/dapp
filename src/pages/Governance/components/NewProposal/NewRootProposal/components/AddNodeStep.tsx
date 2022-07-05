import Input from 'ui/Input';

import { FormStep } from 'components/MultiStepForm';

import useForm from 'hooks/useForm';

import { useNewRootProposal } from '../NewRootProposal';

import { address, hash, required, url } from 'func/validators';

function AddNodeStep () {
  const { goNext, goBack } = useNewRootProposal();

  const form = useForm({
    initialValues: {
      hash: '',
      externalLink: '',
      address: ''
    },
    validators: {
      hash: [required, hash],
      externalLink: [required, url],
      address: [address],
    },
    onSubmit: goNext as () => void,
  });

  return (
    <FormStep
      onNext={form.submit}
      onBack={goBack}
    >
      <Input
        {...form.fields.hash}
        label="Current constitution Hash"
        placeholder="Hash (0x...)"
      />

      <Input
        {...form.fields.externalLink}
        label="Reference link to external source"
        placeholder="Link"
      />

      <Input
        {...form.fields.address}
        label="Root Node to remove (optional)"
        placeholder="Address (0x...)"
      />
    </FormStep>
  );
}

export default AddNodeStep;
