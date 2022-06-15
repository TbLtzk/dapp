
import PopperTooltip from 'components/Base/PopperTooltip';

import { ProposalContainer } from './styles';

import { CONTRACTS_NAMES } from 'constants/contracts';
import { STATUSES } from 'constants/statuses';
import { convertToMonthDayYear, remainDate } from 'func/convertDate';

function ProposalContent ({ proposal }) {
  const approvalContracts =
    proposal.contract === CONTRACTS_NAMES.addressVoting ||
    proposal.contract === CONTRACTS_NAMES.upgradeVoting;

  const contractsWithoutVeto =
    proposal.contract === CONTRACTS_NAMES.validatorsSlashingVoting ||
    proposal.contract === CONTRACTS_NAMES.emergencyUpdateVoting;

  return (
    <ProposalContainer>
      <div className="content__item">
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

      {!(approvalContracts || contractsWithoutVeto) && (
        <div className="content__item">
          <h5>Veto Ends</h5>
          <PopperTooltip
            placement="bottom"
            disabled={proposal.status === STATUSES.pending}
            trigger={<p>{convertToMonthDayYear(proposal.vetoEndTime)}</p>}
          >
            {proposal.status === STATUSES.accepted
              ? (
                <p>
                  Remaining Time for Veto <br /> {remainDate(proposal.vetoEndTime)}
                </p>
              )
              : 'Proposal ' + proposal.status
            }

          </PopperTooltip>
        </div>
      )}
    </ProposalContainer>
  );
}

export default ProposalContent;
