import React from 'react';

import Input from 'components/Base/Form/Input';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';

import { useCastObjection } from '../CastObjectionModal';

import { url } from 'func/validators';

function LinkStep () {
  const { goNext } = useCastObjection();

  const form = useForm({
    initialValues: { externalLink: '' },
    validators: { externalLink: [url] },
    onSubmit: goNext,
  });

  return (
    <ModalStep
      disabled={!form.isValid}
      onNext={form.submit}
    >
      <h2>The target of a slashing proposal has the right tp object the slashing.</h2>
      <Input
        {...form.fields.externalLink}
        invertedColors
        label="Please provide a reference link to external source giving details of your objection"
        placeholder="External Link"
      />
    </ModalStep>
  );
}

export default LinkStep;
