
import { ExpertProposalForm } from 'typings/forms';

import FormBlock from 'components/FormBlock';
import { FormStep } from 'components/MultiStepForm';
import ParameterViewer from 'components/ParameterViewer';

import { useNewExpertProposal } from '../NewExpertProposal';

function ConfirmationStep () {
  const { values, goBack, confirm, updateStep } = useNewExpertProposal();

  const proposalTypeMap: Record<ExpertProposalForm['type'], string> = {
    'add-expert': 'Add Expert',
    'remove-expert': 'Remove Expert',
    'parameter-vote': 'Parameter Vote',
  };

  const expertPanelMap: Record<ExpertProposalForm['panelType'], string> = {
    defi: 'Q DeFi (Decentralized Finance) Membership Panel',
    'fees-incentives': 'Q Fees & Incentives Membership Panel',
    'root-node': 'Q Root Node Selection Expert Panel',
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

      {values.type === 'parameter-vote'
        ? (
          <FormBlock
            icon="edit"
            title="Parameters"
            onAction={() => updateStep(1)}
          >
            <div>
              <p className="text-md color-secondary">Expert Panel</p>
              <p className="text-lg">{expertPanelMap[values.panelType]}</p>
            </div>

            <div>
              <p className="text-md color-secondary">External source</p>
              <p className="text-lg">{values.externalLink}</p>
            </div>

            {values.params.map((param, index) => (
              <ParameterViewer
                key={index + param.key}
                parameter={param}
                index={index}
              />
            ))}
          </FormBlock>
        )
        : (
          <FormBlock
            icon="edit"
            title={values.type === 'add-expert' ? 'Add Expert' : 'Remove Expert'}
            onAction={() => updateStep(1)}
          >
            <div>
              <p className="text-md color-secondary">Expert Panel</p>
              <p className="text-lg">{expertPanelMap[values.panelType]}</p>
            </div>

            <div>
              <p className="text-md color-secondary">Candidate Q Address</p>
              <p className="text-lg">{values.address}</p>
            </div>

            <div>
              <p className="text-md color-secondary">External source</p>
              <p className="text-lg">{values.externalLink}</p>
            </div>
          </FormBlock>
        )}
    </FormStep>
  );
}

export default ConfirmationStep;
