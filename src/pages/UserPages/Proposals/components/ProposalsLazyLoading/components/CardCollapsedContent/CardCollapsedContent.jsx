import React from 'react'
import { PROPOSALS_TYPES, STATUSES } from 'constants/statuses'
import PollDetail from '../PollDetail'
import VoteBreakdown from '../VoteBreakdown'
import SlashingObjection from '../SlashingObjection'

function CardCollapsedContent ({ proposal, voteBreakdown, proposalsKind, contract, proposalID, objData }) {
  return (
        <>
            <div className="list-card__line" />
            <PollDetail pollDetail={proposal} proposalsKind={proposalsKind} />
            <div className="list-card__line" />
            <VoteBreakdown voteBreakdown={voteBreakdown} />
            {proposalsKind === PROPOSALS_TYPES.slashingProposals && objData === STATUSES.executed
              ? (
                <>
                    <div className="list-card__line" />
                    <SlashingObjection contract={contract} proposalId={proposalID} objData={proposal?.objEscrow} />
                </>
                )
              : null}
        </>
  )
}

export default CardCollapsedContent
