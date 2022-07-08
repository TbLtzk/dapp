import { useSelector } from 'react-redux';

import Input from 'ui/Input';

import { FormStep } from 'components/MultiStepForm';

import useForm from 'hooks/useForm';

import { useNewRootProposal } from '../NewRootProposal';

import { constitutionHash } from 'store/voting/proposals/selectors';

import { address, currentHash, required, url } from 'func/validators';

function AddNodeStep () {
  const { goNext, goBack } = useNewRootProposal();
  const currentHashValue = useSelector(constitutionHash);

  const form = useForm({
    initialValues: {
      hash: '',
      externalLink: '',
      address: ''
    },
    validators: {
      hash: [required, currentHash(currentHashValue)],
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
