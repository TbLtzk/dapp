import React from 'react';

import Input from 'components/Base/Form/Input';
import RadioGroup from 'components/Base/Form/RadioGroup';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';

import { useCreateProposal } from '../../RootProposalModal';

import { address, hash, required, requiredIf, url } from 'func/validators';

function AddNodeStep () {
  const { goNext, goBack } = useCreateProposal();

  const form = useForm({
    initialValues: {
      hash: '',
      externalLink: '',
      isRemovingNode: false,
      address: ''
    },
    validators: {
      hash: [required, hash],
      externalLink: [required, url],
      isRemovingNode: [required],
      address: [
        requiredIf((_, form) => form.isRemovingNode),
        address
      ],
    },
    onSubmit: goNext,
  });

  const removeNodeOptions = [
    { value: false, label: 'No' },
    { value: true, label: 'Yes' },
  ];

  const handleRemoveChange = (value) => {
    form.fields.address.onChange('');
    form.fields.isRemovingNode.onChange(value);
  };

  return (
    <ModalStep
      onNext={form.submit}
      onBack={goBack}
    >
      <h2>Add Your account as a Candidate for the Root Node Panel. Optionally provide a Root Node to Remove.</h2>
      {JSON.stringify(form.errors)}
      <div style={{ display: 'grid', gap: '15px' }}>
        <Input
          {...form.fields.hash}
          invertedColors
          label="Provide current constitution Hash to declare your consent"
          placeholder="Hash"
        />

        <Input
          {...form.fields.externalLink}
          invertedColors
          label="Provide a reference link to external source"
          placeholder="External Link"
        />

        <div>
          <h2>Do you want to remove a current Root Node?</h2>
          <RadioGroup
            {...form.fields.isRemovingNode}
            name="remove-root-node"
            options={removeNodeOptions}
            onChange={handleRemoveChange}
          />
        </div>

        {form.values.isRemovingNode && (
          <Input
            {...form.fields.address}
            invertedColors
            label="Root Node to Remove"
            placeholder="Address"
          />
        )}
      </div>
    </ModalStep>
  );
}

export default AddNodeStep;
