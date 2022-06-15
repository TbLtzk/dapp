import React from 'react';

import Input from 'components/Base/Form/Input';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';

import { useCreateProposal } from '../../SlashingProposalModal';

import { CONTRACT_TYPES } from 'constants/contracts';
import { address, percent, required, url } from 'func/validators';

function NominateStep () {
  const { values, goNext, goBack } = useCreateProposal();

  const form = useForm({
    initialValues: {
      address: '',
      percent: '',
      externalLink: ''
    },
    validators: {
      address: [required, address],
      percent: [required, percent],
      externalLink: [required, url]
    },
    onSubmit: goNext,
  });

  const additionalInfo = {
    [CONTRACT_TYPES.rootNodeSlashing]: {
      title: 'Nominate a Root Node to be slashed',
      percentLabel: 'Root Node Stake Amount to slash (%)',
    },

    [CONTRACT_TYPES.validatorNodeSlashing]: {
      title: 'Nominate a Validator Node to be slashed',
      percentLabel: 'Validator Node Stake and Pool Amount to slash (%)',
    },
  };

  const info = additionalInfo[values.type];

  return (
    <ModalStep
      disabled={!form.isValid}
      onNext={form.submit}
      onBack={goBack}
    >
      <h2>{info?.title}</h2>

      <div style={{ display: 'grid', gap: '15px' }}>
        <Input
          {...form.fields.address}
          invertedColors
          label="Provide Slashing Details. Candidate to Slash"
          placeholder="Address"
        />
        <Input
          {...form.fields.percent}
          invertedColors
          label={info?.percentLabel}
          placeholder="%-Value"
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

export default NominateStep;
