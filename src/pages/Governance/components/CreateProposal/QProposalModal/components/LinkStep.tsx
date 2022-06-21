import Input from 'components/Base/Form/Input';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';

import { useCreateProposal } from '../QProposalModal';

import { CONTRACT_TYPES } from 'constants/contracts';
import { required, url } from 'func/validators';

function LinkStep () {
  const { values, goNext, goBack } = useCreateProposal();

  const form = useForm({
    initialValues: { externalLink: '' },
    validators: { externalLink: [required, url] },
    onSubmit: goNext,
  });

  const title = values.type === CONTRACT_TYPES.generalQUpdate
    ? 'General Q Updates gather the Community voice on ideas how to shape Q in the future.'
    : 'Emergency Updates enable Root Nodes to agree on an immediate update for the Q system.';

  return (
    <ModalStep
      disabled={!form.isValid}
      onNext={form.submit}
      onBack={goBack}
    >
      <h2>{title}</h2>
      <Input
        {...form.fields.externalLink}
        invertedColors
        label="Provide a reference link to external source"
        placeholder="https://"
      />
    </ModalStep>
  );
}

export default LinkStep;
