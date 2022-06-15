import React from 'react';

import Tooltip from 'components/Base/Tooltip';

import { ContentWrapper, ProposalContainer } from './styles';

import { CONTRACTS_NAMES } from 'constants/contracts';
import { STATUSES } from 'constants/statuses';
import { convertToMonthDayYear, remainDate } from 'func/convertDate';

function ProposalContent ({ proposal }) {
  const voteOpacity = proposal.status === STATUSES.pending ? '1' : '0.4';
  const vetoOpacity = proposal.status === STATUSES.accepted ? '1' : '0.4';

  const approvalContracts =
        proposal.contract === CONTRACTS_NAMES.addressVoting || proposal.contract === CONTRACTS_NAMES.upgradeVoting;

  const contractsWithoutVeto =
        proposal.contract === CONTRACTS_NAMES.validatorsSlashingVoting ||
        proposal.contract === CONTRACTS_NAMES.emergencyUpdateVoting;

  return (
    <ProposalContainer>
      <div>
        <h5>Proposal Id</h5>
        <p>{proposal.id}</p>
      </div>

      <ContentWrapper opacity={voteOpacity}>
        <Tooltip
          disabled={false}
          additionalInfo={
            proposal.status === STATUSES.pending
              ? (
                <div>
                  Remaining Time for Voting <br />
                  {remainDate(proposal.votingEndTime)}
                </div>
              )
              : (
                'Proposal ' + proposal.status
              )
          }
        >
          <div className="content__item">
            <h5>Voting Ends</h5>
            <p>{convertToMonthDayYear(proposal.votingEndTime)}</p>
          </div>
        </Tooltip>
      </ContentWrapper>

      {approvalContracts || contractsWithoutVeto
        ? null
        : (
          <ContentWrapper opacity={vetoOpacity}>
            <Tooltip
              disabled={proposal.status === STATUSES.pending}
              additionalInfo={
                proposal.status === STATUSES.accepted
                  ? (
                    <div>
                      Remaining Time for Veto <br /> {remainDate(proposal.vetoEndTime)}
                    </div>
                  )
                  : (
                    'Proposal ' + proposal.status
                  )
              }
            >
              <div className="content__item">
                <h5>Veto Ends</h5>
                <p>{convertToMonthDayYear(proposal.vetoEndTime)}</p>
              </div>
            </Tooltip>
          </ContentWrapper>
        )}
    </ProposalContainer>
  );
}

export default ProposalContent;
