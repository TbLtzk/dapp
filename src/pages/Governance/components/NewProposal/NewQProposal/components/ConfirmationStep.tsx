
import { Classification } from '@q-dev/q-js-sdk';
import { QProposalForm } from 'typings/forms';

import FormBlock from 'components/FormBlock';
import { FormStep } from 'components/MultiStepForm';
import ParameterViewer from 'components/ParameterViewer';

import { useNewQProposalForm } from '../NewQProposal';

function ConfirmationStep () {
  const { values, goBack, confirm, updateStep } = useNewQProposalForm();
  const isConstitutionType = values.type === 'constitution';

  const classificationMap: Record<Classification, string> = {
    [Classification.BASIC]: 'Basic part',
    [Classification.DETAILED]: 'Detailed part',
    [Classification.FUNDAMENTAL]: 'Fundamental part',
  };

  const proposalTypeMap: Record<QProposalForm['type'], string> = {
    constitution: 'Constitution Update',
    general: 'General Q Update',
    emergency: 'Emergency Update'
  };

  return (
    <FormStep
      onConfirm={confirm}
      onBack={goBack}
    >
      <FormBlock
        icon="edit"
        title="Proposal type"
        onAction={() => updateStep(0)}
      >
        <p className="text-lg">
          {proposalTypeMap[values.type]}
        </p>
      </FormBlock>

      {isConstitutionType
        ? (
          <FormBlock
            icon="edit"
            title="Basic details"
            onAction={() => updateStep(1)}
          >
            <div>
              <p className="text-md color-secondary">Classification</p>
              <p className="text-lg">
                {classificationMap[values.classification]}
              </p>
            </div>

            <div>
              <p className="text-md color-secondary">Hash:</p>
              <p className="text-lg">{values.hash}</p>
            </div>

            <div>
              <p className="text-md color-secondary">External source</p>
              <p className="text-lg">{values.externalLink}</p>
            </div>
          </FormBlock>
        )
        : (
          <FormBlock
            icon="edit"
            title="Details"
            onAction={() => updateStep(1)}
          >
            <div>
              <p className="text-md color-secondary">External source</p>
              <p className="text-lg">{values.externalLink}</p>
            </div>
          </FormBlock>
        )
      }

      {isConstitutionType && (
        <FormBlock
          icon="edit"
          title="Parameters"
          onAction={() => updateStep(2)}
        >
          <div>
            <p className="text-md color-secondary">
              Change Constitution Parameter
            </p>
            <p className="text-lg">
              {values.isParamsChanged ? 'Yes' : 'No'}
            </p>
          </div>

          {values.params.map((param, index) => (
            <ParameterViewer
              key={index + param.key}
              parameter={param}
              index={index}
            />
          ))}
        </FormBlock>
      )}
    </FormStep>
  );
}

export default ConfirmationStep;
