import { Classification } from '@q-dev/q-js-sdk';
import { Options } from 'typings/forms';

import Input from 'components/Base/Form/Input';
import RadioGroup from 'components/Base/Form/RadioGroup';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';

import { useCreateProposal } from '../QProposalModal';

import { hash, required, url } from 'func/validators';

function ConstitutionStep () {
  const { goNext, goBack } = useCreateProposal();

  const form = useForm({
    initialValues: {
      classification: Classification.BASIC,
      hash: '',
      isParamsChanged: false,
      externalLink: ''
    },
    validators: {
      classification: [required],
      hash: [required, hash],
      isParamsChanged: [required],
      externalLink: [required, url],
    },
    onSubmit: (form) => {
      goNext({
        ...form as ReturnType<typeof useCreateProposal>['values'],
        params: []
      });
    },
  });

  const partOptions: Options<Classification> = [
    {
      value: Classification.FUNDAMENTAL,
      label: 'Fundamental Part \t| Preamble'
    },
    {
      value: Classification.BASIC,
      label: 'Basic Part \t\t\t| Main Body and Definitions'
    },
    {
      value: Classification.DETAILED,
      label: 'Detailed Part \t\t| Selected Appendices'
    },
  ];

  const changeParamOptions = [
    { value: false, label: 'No' },
    { value: true, label: 'Yes' },
  ];

  return (
    <ModalStep
      disabled={!form.isValid}
      onNext={form.submit}
      onBack={goBack}
    >
      <h2>Constitution Updates change the underlying agreement upon which the Q system operates.</h2>
      <h2>Which part of the Constitution is affected</h2>

      <div style={{ display: 'grid', gap: '15px' }}>
        <RadioGroup
          {...form.fields.classification}
          name="constition-part"
          options={partOptions}
        />

        <Input
          {...form.fields.hash}
          invertedColors
          label="Please provide the new constitution Hash"
          placeholder="Hash"
        />

        <Input
          {...form.fields.externalLink}
          invertedColors
          label="Provide a reference link to external source"
          placeholder="External Link"
        />

        <div>
          <h2>Does Your Proposal include a Change of a Constitution Parameter?</h2>
          <RadioGroup
            {...form.fields.isParamsChanged}
            name="change-constitution-params"
            options={changeParamOptions}
          />
        </div>
      </div>
    </ModalStep>
  );
}

export default ConstitutionStep;
