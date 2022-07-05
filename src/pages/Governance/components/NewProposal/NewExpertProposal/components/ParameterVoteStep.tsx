import { ExpertProposalForm, ExpertType, FormParameter, Options } from 'typings/forms';
import Button from 'ui/Button';
import Icon from 'ui/Icon';
import Input from 'ui/Input';
import RadioGroup from 'ui/RadioGroup';

import FormBlock from 'components/FormBlock';
import { FormStep } from 'components/MultiStepForm';
import ParameterForm from 'components/ParameterForm';

import useForm from 'hooks/useForm';
import useFormArray from 'hooks/useFormArray';

import { useNewExpertProposal } from '../NewExpertProposal';

import { CONTRACT_TYPES } from 'constants/contracts';
import { required, url } from 'func/validators';

function ParameterVoteStep () {
  const { goNext, goBack, onChange } = useNewExpertProposal();

  const form = useForm({
    initialValues: {
      panelType: 'fees-incentives' as ExpertType,
      externalLink: ''
    },
    validators: {
      panelType: [required],
      externalLink: [required, url],
    },
    onSubmit: (form) => {
      goNext(form as ExpertProposalForm);
    },
  });

  const formArray = useFormArray<FormParameter>({
    minCount: 1,
    maxCount: 30,
    onSubmit: (forms) => {
      onChange({ params: forms });
      form.submit();
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

  const handleSubmit = () => {
    formArray.submit();
    if (!formArray.isValid) return;
    form.submit();
  };

  const panelToContractType: Record<ExpertType, string> = {
    defi: CONTRACT_TYPES.qDefi,
    'fees-incentives': CONTRACT_TYPES.qFee,
    'root-node': CONTRACT_TYPES.qEprs,
  };

  return (
    <FormStep
      disabled={!form.isValid || !formArray.isValid}
      onNext={handleSubmit}
      onBack={goBack}
    >
      <RadioGroup
        {...form.fields.panelType}
        label="Panel which governs the parameter"
        name="param-panel-type"
        options={panelTypeOptions}
      />

      <Input
        {...form.fields.externalLink}
        label="Reference link to external source"
        placeholder="Link"
      />

      {formArray.forms.map((formItem, i) => (
        <FormBlock
          key={formItem.id}
          title={`Parameter ${i + 1}`}
          icon={formArray.forms.length > 1 ? 'delete' : undefined}
          onAction={() => formArray.removeForm(formItem.id)}
        >
          <ParameterForm
            key={formItem.id}
            contract={panelToContractType[form.values.panelType as ExpertType]}
            onChange={formItem.onChange}
          />
        </FormBlock>
      ))}

      <Button
        look="ghost"
        onClick={formArray.appendForm}
      >
        <Icon name="add" />
        <span>Add parameter</span>
      </Button>
    </FormStep>
  );
}

export default ParameterVoteStep;
