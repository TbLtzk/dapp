import { useTranslation } from 'react-i18next';

import { QProposalForm, RadioOptions } from 'typings/forms';
import RadioGroup from 'ui/RadioGroup';

import { FormStep } from 'components/MultiStepForm';

import useForm from 'hooks/useForm';

import { useNewQProposalForm } from '../NewQProposal';

import { required } from 'func/validators';

function TypeStep () {
  const { t } = useTranslation();
  const { goNext, onChange } = useNewQProposalForm();

  const form = useForm({
    initialValues: { type: 'constitution' as QProposalForm['type'] },
    validators: { type: [required] },
    onChange,
    onSubmit: goNext,
  });

  const typeOptions: RadioOptions<QProposalForm['type']> = [
    {
      value: 'constitution',
      label: t('CONSTITUTION_UPDATE'),
      tip: t('CONSTITUTION_UPDATE_TIP')
    },
    {
      value: 'general',
      label: t('GENERAL_Q_UPDATE'),
      tip: t('GENERAL_Q_UPDATE_TIP')
    },
    {
      value: 'emergency',
      label: t('EMERGENCY_UPDATE'),
      tip: t('EMERGENCY_UPDATE_TIP')
    }
  ];

  return (
    <FormStep
      disabled={!form.isValid}
      onNext={form.submit}
    >
      <RadioGroup
        {...form.fields.type}
        extended
        name="q-type"
        options={typeOptions}
      />
    </FormStep>
  );
}

export default TypeStep;
