
import { SlashingProposal } from 'typings/proposals';
import Tooltip from 'ui/Tooltip';

import ExplorerAddress from 'components/Custom/ExplorerAddress';

import useEndTime from '../../../hooks/useEndTime';
import LinkViewer from '../../LinkViewer';

import { formatPercent } from 'func/formatters';

function DecisionDetails ({ proposal }: { proposal: SlashingProposal }) {
  const decision = proposal.objEscrow.decision;
  const decisionEndTime = useEndTime(decision.endDate);

  const requiredPercentage = Number(decision.requiredConfirmations) / proposal.rootNodesNumber * 100;

  return (
    <div className="details-list">
      <div className="details-list-item">
        <div className="details-item">
          <p className="text-md color-secondary">End Time</p>
          <Tooltip
            placement="bottom"
            trigger={(
              <p className="text-md">{decisionEndTime.relative}</p>
            )}
          >
            {decisionEndTime.formatted}
          </Tooltip>
        </div>

        <div className="details-item">
          <p className="text-md color-secondary">Proposer</p>
          <ExplorerAddress
            short
            iconed
            className="text-md"
            address={decision.proposer}
          />
        </div>

        <div className="details-item">
          <p className="text-md color-secondary">Remark</p>
          <LinkViewer link={decision.externalReference} />
        </div>

        <div className="details-item">
          <p className="text-md color-secondary">Adjusted Slashing Percentage</p>
          <p className="text-md">{formatPercent(decision.percentage)}</p>
        </div>
      </div>

      <div className="details-list-item">
        <div className="details-item">
          <p className="text-md color-secondary">Required Confirmations</p>
          <p className="text-md">
            <span> {decision.requiredConfirmations} </span>
            <span className="font-light">({formatPercent(requiredPercentage)})</span>
          </p>
        </div>

        <div className="details-item">
          <p className="text-md color-secondary">Current Confirmations</p>
          <p className="text-md">
            <span>{decision.confirmationCount} </span>
            <span className="font-light">({formatPercent(decision.currentConfirmationPercentage)})</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DecisionDetails;
