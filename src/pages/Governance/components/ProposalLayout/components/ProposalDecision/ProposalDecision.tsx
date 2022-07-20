import { SlashingProposal } from 'typings/proposals';
import Illustration from 'ui/Illustration';

import DecisionActions from './components/DecisionActions';
import DecisionDetails from './components/DecisionDetails';

import { ZERO_ADDRESS } from 'constants/config';

function ProposalDecision ({ proposal }: { proposal: SlashingProposal }) {
  return (
    <div className="block">
      <div className="block__header">
        <h2 className="text-h2">Decision</h2>
        <DecisionActions proposal={proposal} />
      </div>

      <div className="block__content">
        {proposal.objEscrow.decision.proposer === ZERO_ADDRESS
          ? (
            <div className="details-stub">
              <Illustration type="bulb" />
              <div className="details-stub-content">
                <p className="text-md font-semibold">
                  No suggested decision
                </p>
                <p className="text-sm">
                  Click the “Propose decision” button to propose a decision
                </p>
              </div>
            </div>
          )
          : <DecisionDetails proposal={proposal} />
        }
      </div>
    </div>
  );
}

export default ProposalDecision;
