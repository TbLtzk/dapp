import { useTranslation } from 'react-i18next';

import { RadioOptions, RootNodeProposalForm } from 'typings/forms';

import { FormStep } from 'components/MultiStepForm';
import RadioGroup from 'ui/RadioGroup';

import useForm from 'hooks/useForm';

import { useNewRootProposal } from '../NewRootProposal';

import { required } from 'utils/validators';

function TypeStep () {
  const { t } = useTranslation();
  const { goNext, onChange } = useNewRootProposal();

  const form = useForm({
    initialValues: { type: 'add-root-node' as RootNodeProposalForm['type'] },
    validators: { type: [required] },
    onChange,
    onSubmit: goNext,
  });

  const typeOptions: RadioOptions<RootNodeProposalForm['type']> = [
    {
      value: 'add-root-node',
      label: t('ADD_A_NEW_ROOT_NODE'),
      tip: t('ADD_ROOT_NODE_TIP')
    },
    {
      value: 'remove-root-node',
      label: t('REMOVE_A_CURRENT_ROOT_NODE'),
      tip: t('REMOVE_ROOT_NODE_TIP')
    },
    {
      value: 'exit-root-node',
      label: t('VOLUNTARY_EXIT_FROM_ROOT_NODE_PANEL'),
      tip: t('EXIT_ROOT_NODE_PANEL_WITHOUT_PROPOSAL')
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
        name="root-node-type"
        options={typeOptions}
      />
    </FormStep>
  );
}

export default TypeStep;
