import React from 'react';

import RadioGroup from 'components/Base/Form/RadioGroup';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';

import { useCreateProposal } from '../../SlashingProposalModal';

import { required } from 'func/validators';

function TypeStep () {
  const { goNext } = useCreateProposal();

  const form = useForm({
    initialValues: { type: '' },
    validators: { type: [required] },
    onSubmit: goNext,
  });

  const typeOptions = [
    {
      value: 'root-node-slashing',
      label: 'Root Node Slashing',
    },
    {
      value: 'validator-node-slashing',
      label: 'Validator Node Slashing',
    },
  ];

  return (
    <ModalStep
      disabled={!form.isValid}
      onNext={form.submit}
    >
      <h2>Please select type of Q Root Node Panel Proposal</h2>
      <RadioGroup
        {...form.fields.type}
        name="slashing-type"
        options={typeOptions}
      />
    </ModalStep>
  );
}

export default TypeStep;
