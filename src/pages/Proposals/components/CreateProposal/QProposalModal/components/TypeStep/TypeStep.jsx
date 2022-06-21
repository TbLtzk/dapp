import React from 'react';
import { useSelector } from 'react-redux';

import RadioGroup from 'components/Base/Form/RadioGroup';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';

import { useCreateProposal } from '../../QProposalModal';

import { mode } from 'store/dashboard-mode/selectors';

import { MODE } from 'constants/config';
import { required } from 'func/validators';

function TypeStep () {
  const appMode = useSelector(mode);
  const { goNext } = useCreateProposal();

  const form = useForm({
    initialValues: { type: '' },
    validators: { type: [required] },
    onSubmit: goNext,
  });

  const typeOptions = [
    {
      value: 'constitution-update',
      label: 'Constitution Update',
    },
    {
      value: 'general-q-update',
      label: 'General Q Update',
    },
    ...(appMode === MODE.advanced
      ? [{
        value: 'emergency-update',
        label: 'Emergency Update'
      }]
      : []
    )
  ];

  return (
    <ModalStep
      disabled={!form.isValid}
      onNext={form.submit}
    >
      <h2>Please select type of Q Proposal</h2>
      <RadioGroup
        {...form.fields.type}
        name="q-type"
        options={typeOptions}
      />
    </ModalStep>
  );
}

export default TypeStep;
