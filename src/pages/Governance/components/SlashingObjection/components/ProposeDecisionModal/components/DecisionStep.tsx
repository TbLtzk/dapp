
import Input from 'components/Base/Form/Input';
import RadioGroup from 'components/Base/Form/RadioGroup';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';

import { useProposeDecision } from '../ProposeDecisionModal';

import { percent, required, url } from 'func/validators';

function DecisionStep () {
  const { goNext } = useProposeDecision();

  const form = useForm({
    initialValues: {
      externalLink: '',
      percentage: '',
      isAppealNeglected: '',
    },
    validators: {
      externalLink: [required, url],
      percentage: [required, percent],
      isAppealNeglected: [required],
    },
    onSubmit: goNext as () => void,
  });

  const appealNeglectedOptions = [
    { value: true, label: 'Yes' },
    { value: false, label: 'No' },
  ];

  return (
    <ModalStep
      disabled={!form.isValid}
      onNext={form.submit}
    >
      <h2>Members of the Root Node Panel check the objection and propose decision to confirm.</h2>

      <div style={{ display: 'grid', gap: '15px' }}>
        <Input
          {...form.fields.externalLink}
          invertedColors
          label="Please provide a reference link to external source giving details of your decision"
          placeholder="External Link"
        />

        <Input
          {...form.fields.percentage}
          invertedColors
          type="number"
          label="Please provide the adjusted percentage for slashing"
          placeholder="%-Value"
        />

        <div>
          <h2>Did the target of the slashing neglect a formal appeal?</h2>

          <RadioGroup
            {...form.fields.isAppealNeglected}
            name="decision-appeal-neglected"
            options={appealNeglectedOptions}
          />
        </div>
      </div>
    </ModalStep>
  );
}

export default DecisionStep;
