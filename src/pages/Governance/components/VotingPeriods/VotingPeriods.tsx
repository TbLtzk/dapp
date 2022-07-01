import { HTMLAttributes } from 'react';

import Tooltip from 'ui/Tooltip';

import { VotingContainer } from './styles';

import { CONTRACTS_NAMES } from 'constants/contracts';
import { formatDate, formatDateRelative } from 'func/formatters';

interface Props extends HTMLAttributes<HTMLDivElement> {
  proposal: any
}

function VotingPeriods ({ proposal, ...rest }: Props) {
  const hasNoVeto = [
    CONTRACTS_NAMES.addressVoting,
    CONTRACTS_NAMES.upgradeVoting,
    CONTRACTS_NAMES.validatorsSlashingVoting,
    CONTRACTS_NAMES.emergencyUpdateVoting,
  ].includes(proposal.contract);

  const votingEndTime = new Date(proposal.votingEndTime * 1000).getTime();
  const vetoEndTime = new Date(proposal.vetoEndTime * 1000).getTime();

  const votingText = votingEndTime > Date.now()
    ? 'Voting ends'
    : 'Voting ended';
  const vetoText = vetoEndTime > Date.now()
    ? 'Veto ends'
    : 'Veto ended';

  return (
    <VotingContainer {...rest}>
      <Tooltip
        placement="bottom"
        trigger={(
          <p className="text-md font-light">
            {`${votingText} ${formatDateRelative(votingEndTime)}`}
          </p>
        )}
      >
        {formatDate(votingEndTime)}
      </Tooltip>

      <Tooltip
        placement="bottom"
        disabled={hasNoVeto || !vetoEndTime}
        trigger={(
          <p className="text-md font-light">
            {hasNoVeto || !vetoEndTime
              ? 'No Veto'
              : `${vetoText} ${formatDateRelative(vetoEndTime)}`
            }
          </p>
        )}
      >
        {formatDate(vetoEndTime)}
      </Tooltip>
    </VotingContainer>
  );
}

export default VotingPeriods;
