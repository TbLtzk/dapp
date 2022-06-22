import PopperTooltip from 'components/Base/PopperTooltip';

import { VotingContainer } from './styles';

import { CONTRACTS_NAMES } from 'constants/contracts';
import { STATUSES } from 'constants/statuses';
import { convertToMonthDayYear, remainDate } from 'func/convertDate';

function VotingPeriods ({ proposal }: { proposal: any }) {
  const isVetoHidden = [
    CONTRACTS_NAMES.addressVoting,
    CONTRACTS_NAMES.upgradeVoting,
    CONTRACTS_NAMES.validatorsSlashingVoting,
    CONTRACTS_NAMES.emergencyUpdateVoting,
  ].includes(proposal.contract);

  return (
    <VotingContainer>
      <div>
        <h5>Voting Ends</h5>
        <PopperTooltip
          placement="bottom"
          trigger={<p>{convertToMonthDayYear(proposal.votingEndTime)}</p>}
        >
          {proposal.status === STATUSES.pending
            ? (
              <div>
                Remaining Time for Voting <br />
                {remainDate(proposal.votingEndTime)}
              </div>
            )
            : 'Proposal ' + proposal.status
          }
        </PopperTooltip>
      </div>

      {!isVetoHidden && (
        <div>
          <h5>Veto Ends</h5>
          <PopperTooltip
            placement="bottom"
            disabled={proposal.status === STATUSES.pending}
            trigger={<p>{convertToMonthDayYear(proposal.vetoEndTime)}</p>}
          >
            {proposal.status === STATUSES.accepted
              ? (
                <p>
                  Remaining Time for Veto
                  <br />
                  {remainDate(proposal.vetoEndTime)}
                </p>
              )
              : 'Proposal ' + proposal.status
            }

          </PopperTooltip>
        </div>
      )}
    </VotingContainer>
  );
}

export default VotingPeriods;
