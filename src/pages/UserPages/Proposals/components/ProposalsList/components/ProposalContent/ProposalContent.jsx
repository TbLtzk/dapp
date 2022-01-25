import React from 'react'

import { convertToMonthDayYear, remainDate } from 'func/convertDate'
import Tooltip from 'components/Base/Tooltip'
import { CONTRACTS_NAMES } from 'constants/contracts'
import { ContentWrapper } from './styles'

function ProposalContent ({ proposal }) {
  const voteOpacity = proposal.status !== 'Pending' ? '0.4' : '1'
  const vetoOpacity = proposal.status === 'Accepted' ? '1' : '0.4'

  const approvalContracts =
        proposal.contract === CONTRACTS_NAMES.addressVoting || proposal.contract === CONTRACTS_NAMES.upgradeVoting

  const contractsWithoutVeto =
        proposal.contract === CONTRACTS_NAMES.validatorsSlashingVoting ||
        proposal.contract === CONTRACTS_NAMES.emergencyUpdateVoting

  return (
        <div className="list-card__three-colm">
            <div>
                <h5>Proposal Id</h5>
                <p>{proposal.id}</p>
            </div>

            <ContentWrapper opacity={voteOpacity}>
                <Tooltip
                    disabled={false}
                    additionalInfo={
                        proposal.status === 'Pending'
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
                        disabled={proposal.status === 'Pending'}
                        additionalInfo={
                            proposal.status === 'Accepted'
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
        </div>
  )
}

export default ProposalContent
