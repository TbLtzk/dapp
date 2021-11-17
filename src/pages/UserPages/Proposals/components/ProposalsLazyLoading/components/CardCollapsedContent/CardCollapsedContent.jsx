import React from 'react'
import { PROPOSALS_TYPES, STATUSES } from 'constants/statuses'
import PollDetail from '../PollDetail'
import VoteBreakdown from '../VoteBreakdown'
import SlashingObjection from '../SlashingObjection'

import { convertToMonthDayYear, remainDate } from 'func/convertDate'
import { CONTRACTS_NAMES } from 'constants/contracts'

function CardCollapsedContent (props) {
  const {
    proposalType,
    proposal,
    voteBreakdown,
    proposalsKind,
    contract,
    proposalID,
    votingTime,
    objData
  } = props
  function getVetoInfo (proposal) {
    switch (proposal.contract) {
      case CONTRACTS_NAMES.validatorsSlashingVoting:
      case CONTRACTS_NAMES.emergencyUpdateVoting:
        return null
      default:
        return (
          <>
            <div>
              <h5>Veto Start</h5>
              <p>{convertToMonthDayYear(proposal.vetoEndTime)}</p>
            </div>
            <div>
              <h5>Remaining Time for Veto</h5>
              <p>{remainDate(proposal.vetoEndTime)}</p>
            </div>
          </>
        )
    }
  }
  return (
    <>
      <div className="list-card__three-colm">
        {proposalType && <div><h5>Proposal Type</h5><p>{proposalType}</p></div>}
        {getVetoInfo(proposal, votingTime)}
      </div>
      <div className="list-card__line"/>
      <PollDetail pollDetail={proposal} proposalsKind={proposalsKind}/>
      <div className="list-card__line"/>
      <VoteBreakdown voteBreakdown={voteBreakdown}/>
      {
        proposalsKind === PROPOSALS_TYPES.slashingProposals && objData === STATUSES.executed
          ? (<>
            <div className="list-card__line"/>
            <SlashingObjection
              contract={contract}
              proposalId={proposalID}
              objData={proposal?.objEscrow}
              />
          </>)
          : null
      }
    </>
  )
}

export default CardCollapsedContent
