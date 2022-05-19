import React from 'react';

import Input from 'components/Base/Form/Input';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';

import { useCreateProposal } from '../../RootProposalModal';

import { address, required } from 'func/validators';

function RemoveNodeStep () {
  const { goNext, goBack } = useCreateProposal();

  const form = useForm({
    initialValues: {
      address: '',
      externalLink: ''
    },
    validators: {
      address: [required, address],
      externalLink: [required]
    },
    onSubmit: goNext,
  });

  return (
    <ModalStep
      disabled={!form.isValid}
      onNext={form.submit}
      onBack={goBack}
    >
      <h2>Nominate a Root Node to Remove</h2>

      <div style={{ display: 'grid', gap: '15px' }}>
        <Input
          {...form.fields.address}
          invertedColors
          label="Root Node to Remove"
          placeholder="Address"
        />

        <Input
          {...form.fields.externalLink}
          invertedColors
          label="Provide a reference link to external source"
          placeholder="External Link"
        />
      </div>
    </ModalStep>
  );
}

export default RemoveNodeStep;
