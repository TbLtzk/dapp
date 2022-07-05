import { ExpertProposalForm, ExpertType, Options } from 'typings/forms';
import Input from 'ui/Input';
import RadioGroup from 'ui/RadioGroup';

import { FormStep } from 'components/MultiStepForm';

import useForm from 'hooks/useForm';

import { useNewExpertProposal } from '../NewExpertProposal';

import { address, required, url } from 'func/validators';

function ManageExpertStep () {
  const { goNext, goBack } = useNewExpertProposal();

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
    <FormStep
      disabled={!form.isValid}
      onNext={form.submit}
      onBack={goBack}
    >
      <RadioGroup
        {...form.fields.panelType}
        label="Expert panel type"
        name="expert-panel-type"
        options={panelTypeOptions}
      />

      <Input
        {...form.fields.address}
        label="Candidate Q Address"
        placeholder="Address (0x...)"
      />

      <Input
        {...form.fields.externalLink}
        label="Reference link to external source"
        placeholder="Link"
      />
    </FormStep>
  );
}

export default ManageExpertStep;
