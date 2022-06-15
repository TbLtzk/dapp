import React from 'react';

import Input from 'components/Base/Form/Input';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';

import { useProposerRemark } from '../ProposerRemarkModal';

import { required } from 'func/validators';

function RemarkStep () {
  const { goNext } = useProposerRemark();

  const form = useForm({
    initialValues: { proposerRemark: '' },
    validators: { proposerRemark: [required] },
    onSubmit: goNext,
  });

  return (
    <ModalStep
      disabled={!form.isValid}
      onNext={form.submit}
    >
      <h2>As the slashing objection proposer please provide a valid reason.</h2>
      <Input
        {...form.fields.proposerRemark}
        invertedColors
        label="Please provide a remark about the objection"
        placeholder="Proposer remark"
      />
    </ModalStep>
  );
}

export default RemarkStep;
