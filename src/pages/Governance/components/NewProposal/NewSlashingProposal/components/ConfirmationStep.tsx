import { SlashingProposalForm } from 'typings/forms';

import FormBlock from 'components/FormBlock';
import { FormStep } from 'components/MultiStepForm';

import { useNewSlashingProposal } from '../NewSlashingProposal';

import { formatNumber, formatPercent } from 'func/formatters';

function ConfirmationStep () {
  const { values, confirm, goBack, updateStep } = useNewSlashingProposal();

  const proposalTypeMap: Record<SlashingProposalForm['type'], string> = {
    'root-slashing': 'Root Node Slashing',
    'validator-slashing': 'Validator Node Slashing',
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
        title="Slashing details"
        onAction={() => updateStep(1)}
      >
        <div>
          <p className="text-md color-secondary">Candidate to slash</p>
          <p className="text-lg">{values.address}</p>
        </div>

        <div>
          <p className="text-md color-secondary">Amount to slash</p>
          <p className="text-lg">
            <span>{`${formatNumber(values.amount, 4)} Q`}</span>
            <span className="font-light" style={{ marginLeft: '4px' }}>
              ({formatPercent(values.percent)})
            </span>
          </p>
        </div>

        <div>
          <p className="text-md color-secondary">External source</p>
          <p className="text-lg">{values.externalLink}</p>
        </div>
      </FormBlock>
    </FormStep>
  );
}

export default ConfirmationStep;
