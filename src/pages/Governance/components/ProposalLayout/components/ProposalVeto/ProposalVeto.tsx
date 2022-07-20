import { Proposal } from 'typings/proposals';
import Progress from 'ui/Progress';
import Tooltip from 'ui/Tooltip';

import useEndTime from '../../hooks/useEndTime';

import { StyledProposalVeto } from './styles';

import { CONTRACTS_NAMES } from 'constants/contracts';
import { formatNumber, formatPercent } from 'func/formatters';

function ProposalVeto ({ proposal }: { proposal: Proposal }) {
  const hasNoVeto = [
    CONTRACTS_NAMES.addressVoting,
    CONTRACTS_NAMES.upgradeVoting,
    CONTRACTS_NAMES.validatorsSlashingVoting,
    CONTRACTS_NAMES.emergencyUpdateVoting,
  ].includes(proposal.contract);

  const vetoEndTime = useEndTime(new Date(proposal.vetoEndTime * 1000));
  const noVote = proposal.rootNodesNumber - proposal.vetoesNumber;

  return hasNoVeto
    ? null
    : (
      <StyledProposalVeto className="block">
        <div className="block__header">
          <h2 className="text-h2">Veto</h2>
          <Tooltip
            placement="bottom"
            trigger={(
              <p className="text-md font-light">{vetoEndTime.relative}</p>
            )}
          >
            {vetoEndTime.formatted}
          </Tooltip>
        </div>

        <div className="block__content">
          <p className="text-md">
            {`Threshold: >${formatPercent(proposal.vetoThreshold)}`}
          </p>

          <Progress
            className="proposal-veto__progress"
            value={proposal.vetoesNumber}
            max={proposal.rootNodesNumber}
          />

          <div className="proposal-veto__votes">
            <div className="proposal-veto__vote">
              <p className="text-md">Objection</p>
              <p className="text-md proposal-veto__vote-val">
                {formatPercent(proposal.vetoesNumber / proposal.rootNodesNumber * 100)}
              </p>
              <p className="text-md proposal-veto__vote-val">
                {formatNumber(proposal.vetoesNumber, 4)}
              </p>
            </div>

            <div className="proposal-veto__vote">
              <p className="text-md">Did not vote</p>
              <p className="text-md proposal-veto__vote-val">
                {formatPercent(noVote / proposal.rootNodesNumber * 100)}
              </p>
              <p className="text-md proposal-veto__vote-val">
                {formatNumber(noVote, 4)}
              </p>
            </div>
          </div>
        </div>
      </StyledProposalVeto>
    );
}

export default ProposalVeto;
