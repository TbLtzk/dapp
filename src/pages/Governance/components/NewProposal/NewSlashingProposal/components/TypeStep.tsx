import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { RadioOptions, SlashingProposalForm } from 'typings/forms';

import { FormStep } from 'components/MultiStepForm';
import RadioGroup from 'ui/RadioGroup';

import { useNewSlashingProposal } from '../NewSlashingProposal';

import { required } from 'utils/validators';

function TypeStep () {
  const { t } = useTranslation();
  const { goNext, onChange } = useNewSlashingProposal();

  const form = useForm({
    initialValues: { type: 'root-slashing' as SlashingProposalForm['type'] },
    validators: { type: [required] },
    onChange,
    onSubmit: goNext,
  });

  const typeOptions: RadioOptions<SlashingProposalForm['type']> = [
    {
      value: 'root-slashing',
      label: t('ROOT_NODE_SLASHING'),
      tip: t('ROOT_NODE_SLASHING_TIP')
    },
    {
      value: 'validator-slashing',
      label: t('VALIDATOR_NODE_SLASHING'),
      tip: t('VALIDATOR_NODE_SLASHING_TIP')
    },
  ];

  return (
    <FormStep
      disabled={!form.isValid}
      onNext={form.submit}
    >
      <RadioGroup
        {...form.fields.type}
        extended
        name="slashing-type"
        options={typeOptions}
      />
    </FormStep>
  );
}

export default TypeStep;
