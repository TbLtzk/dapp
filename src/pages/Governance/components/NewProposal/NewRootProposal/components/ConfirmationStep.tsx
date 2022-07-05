import { RootNodeProposalForm } from 'typings/forms';

import FormBlock from 'components/FormBlock';
import { FormStep } from 'components/MultiStepForm';

import { useNewRootProposal } from '../NewRootProposal';

function ConfirmationStep () {
  const { values, confirm, goBack, updateStep } = useNewRootProposal();

  const proposalTypeMap: Record<RootNodeProposalForm['type'], string> = {
    'add-root-node': 'Add Root Node',
    'remove-root-node': 'Remove Root Node',
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

      <FormBlock
        icon="edit"
        title="Details"
        onAction={() => updateStep(1)}
      >
        {values.type === 'add-root-node' && (
          <div>
            <p className="text-md color-secondary">Hash</p>
            <p className="text-lg">{values.hash}</p>
          </div>
        )}

        <div>
          <p className="text-md color-secondary">External source</p>
          <p className="text-lg">{values.externalLink}</p>
        </div>

        {values.address !== '' && (
          <div>
            <p className="text-md color-secondary">Root Node to Remove</p>
            <p className="text-lg">{values.address}</p>
          </div>
        )}
      </FormBlock>
    </FormStep>
  );
}

export default ConfirmationStep;
