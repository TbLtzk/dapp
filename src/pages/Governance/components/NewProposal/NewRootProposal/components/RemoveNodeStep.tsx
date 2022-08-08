import { useTranslation } from 'react-i18next';

import { FormStep } from 'components/MultiStepForm';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { useNewRootProposal } from '../NewRootProposal';

import { address, required, url } from 'utils/validators';

function RemoveNodeStep () {
  const { t } = useTranslation();
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
        label={t('ROOT_NODE_ADDRESS')}
        placeholder={t('ADDRESS_PLACEHOLDER')}
      />

      <Input
        {...form.fields.externalLink}
        label={t('REFERENCE_LINK_TO_EXTERNAL_SOURCE')}
        placeholder={t('LINK')}
      />
    </FormStep>
  );
}

export default RemoveNodeStep;
