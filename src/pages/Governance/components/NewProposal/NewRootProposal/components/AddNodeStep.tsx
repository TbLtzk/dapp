import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { FormStep } from 'components/MultiStepForm';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { useNewRootProposal } from '../NewRootProposal';

import { constitutionHash } from 'store/voting/proposals/selectors';

import { address, currentHash, required, url } from 'utils/validators';

function AddNodeStep () {
  const { t } = useTranslation();
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
        label={t('CURRENT_CONSTITUTION_HASH')}
        placeholder={t('HASH_PLACEHOLDER')}
      />

      <Input
        {...form.fields.externalLink}
        label={t('REFERENCE_LINK_TO_EXTERNAL_SOURCE')}
        placeholder={t('LINK')}
      />

      <Input
        {...form.fields.address}
        label={t('ROOT_NODE_TO_REMOVE_OPTIONAL')}
        placeholder={t('ADDRESS_PLACEHOLDER')}
      />
    </FormStep>
  );
}

export default AddNodeStep;
