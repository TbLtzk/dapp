import { ExpertProposalForm, ExpertType, Options } from 'typings/forms';

import Input from 'components/Base/Form/Input';
import RadioGroup from 'components/Base/Form/RadioGroup';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';

import { useCreateProposal } from '../ExpertProposalModal';

import { address, required, url } from 'func/validators';

function ManageExpertStep () {
  const { values, goNext, goBack } = useCreateProposal();

  const form = useForm({
    initialValues: {
      panelType: 'fees-incentives',
      address: '',
      externalLink: ''
    },
    validators: {
      panelType: [required],
      address: [required, address],
      externalLink: [required, url],
    },
    onSubmit: (form) => {
      goNext(form as ExpertProposalForm);
    },
  });

  const addExpert = (
    <>
      <h2>Nominate an Expert to add to an Expert Panel</h2>
      <h4>Select the Panel to which you want to add an Expert:</h4>
    </>
  );

  const removeExpert = (
    <>
      <h2>Nominate an Expert to Remove from an Expert Panel</h2>
      <h4>Select the Panel to which you want to remove an Expert:</h4>
    </>
  );

  const panelTypeOptions: Options<ExpertType> = [
    {
      value: 'fees-incentives',
      label: 'Q Fees & Incentives Membership Panel',
    },
    {
      value: 'defi',
      label: 'Q DeFi (Decentralized Finance) Membership Panel',
    },
    {
      value: 'root-node',
      label: 'Q Root Node Selection Expert Panel',
    },
  ];

  return (
    <ModalStep
      disabled={!form.isValid}
      onNext={form.submit}
      onBack={goBack}
    >
      {values.type === 'add-expert' ? addExpert : removeExpert}

      <div style={{ display: 'grid', gap: '15px' }}>
        <RadioGroup
          {...form.fields.panelType}
          name="expert-panel-type"
          options={panelTypeOptions}
        />

        <Input
          {...form.fields.address}
          invertedColors
          label="Provide Candidate Q Address"
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

export default ManageExpertStep;
