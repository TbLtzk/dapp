import React from 'react'
import { PROPOSALS_TYPES, STATUSES } from 'constants/statuses'
import PollDetail from '../PollDetail'
import VoteBreakdown from '../VoteBreakdown'
import SlashingObjection from '../SlashingObjection'
import VotingItems from '../VotingItems'

function CardCollapsedContent ({
  proposal,
  voteBreakdown,
  proposalsKind,
  contract,
  proposalID,
  status,
  handleVote,
  handleExecute,
  proposalStatus
}) {
  return (
        <>
            <div className="list-card__line" />
            <PollDetail pollDetail={proposal} proposalsKind={proposalsKind} />
            <div className="list-card__line" />
            <VoteBreakdown voteBreakdown={voteBreakdown} />
            <VotingItems proposalStatus={proposalStatus} contract={contract} status={status} handleVote={handleVote} handleExecute={handleExecute} />
            {proposalsKind === PROPOSALS_TYPES.slashingProposals && status === STATUSES.executed
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
