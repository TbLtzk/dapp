import React from 'react';

import Button from 'components/Base/Button';
import Input from 'components/Base/Form/Input';
import ParameterForm from 'components/Base/Form/ParameterForm';
import RadioGroup from 'components/Base/Form/RadioGroup';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';
import useFormArray from 'hooks/useFormArray';

import { useCreateProposal } from '../../ExpertProposalModal';

import { required, url } from 'func/validators';

function ParameterVoteStep () {
  const { goNext, goBack } = useCreateProposal();

  const form = useForm({
    initialValues: { panelType: '', externalLink: '' },
    validators: {
      panelType: [required],
      externalLink: [required, url],
    },
    onSubmit: (form) => {
      goNext({
        ...form,
        params: formArray.forms.map(e => e.values)
      });
    },
  });

  const formArray = useFormArray({
    minCount: 1,
    maxCount: 30,
    onSubmit: form.submit,
  });

  const panelTypeOptions = [
    {
      value: 'q-fees-&-incentives-membership-panel',
      label: 'Q Fees & Incentives Membership Panel',
    },
    {
      value: 'q-defi-(decentralized-finance)-membership-panel',
      label: 'Q DeFi (Decentralized Finance) Membership Panel',
    },
    {
      value: 'q-root-node-selection-expert-panel',
      label: 'Q Root Node Selection Expert Panel',
    },
  ];

  return (
    <ModalStep
      disabled={!form.isValid}
      onNext={form.submit}
      onBack={goBack}
    >
      <h2>Create a Proposal to Change a Q System Parameter.</h2>
      <h2>Select the Panel which governs the parameter</h2>

      <div style={{ display: 'grid', gap: '15px' }}>
        <RadioGroup
          {...form.fields.panelType}
          name="param-panel-type"
          options={panelTypeOptions}
        />

        <div>
          <h2>Please provide exact Key-Name, Type and new Value for Parameter</h2>
          {formArray.forms.map((f) => (
            <ParameterForm
              key={f.id}
              typeContract={form.values.panelType}
              onAdd={formArray.appendForm}
              onRemove={() => formArray.removeForm(f.id)}
              onChange={f.onChange}
            />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Button onClick={formArray.appendForm}>
            <i className="mdi mdi-plus-circle-outline" />
            <span>Add new parametrer</span>
          </Button>

          <Button onClick={() => formArray.removeForm(formArray.forms[formArray.forms.length - 1].id)}>
            <i className="mdi mdi-minus-circle-outline" />
            <span>Remove parameter</span>
          </Button>
        </div>

        <Input
          {...form.fields.externalLink}
          invertedColors
          label="Provide a reference link to external source"
          placeholder="https://"
        />
      </div>
    </ModalStep>
  );
}

export default ParameterVoteStep;
