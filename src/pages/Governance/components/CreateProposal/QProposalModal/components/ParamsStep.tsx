import Button from 'components/Base/Button';
import ParameterForm from 'components/Base/Form/ParameterForm';
import ModalStep from 'components/Base/ModalStep';

import useFormArray from 'hooks/useFormArray';

import { useCreateProposal } from '../QProposalModal';

function ParamsStep () {
  const { goNext, goBack, values } = useCreateProposal();

  const formArray = useFormArray({
    minCount: 1,
    maxCount: 30,
    onSubmit: (forms) => {
      goNext({ params: forms as { key: string, type: string, value: string }[] });
    },
  });

  return (
    <ModalStep
      disabled={!formArray.isValid}
      onNext={formArray.submit}
      onBack={goBack}
    >
      <h2>Please provide exact Key-Name, Type and new Value for Parameter</h2>

      {formArray.forms.map((form) => (
        <ParameterForm
          key={form.id}
          typeContract={values.type}
          onChange={form.onChange}
        />
      ))}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}
      >
        <Button onClick={formArray.appendForm}>
          <i className="mdi mdi-plus-circle-outline" />
          <span>Add new parametrer</span>
        </Button>

        <Button onClick={() => formArray.removeForm(formArray.forms[formArray.forms.length - 1].id)}>
          <i className="mdi mdi-minus-circle-outline" />
          <span>Remove parameter</span>
        </Button>
      </div>
    </ModalStep>
  );
}

export default ParamsStep;
