import React from 'react'
import { PROPOSALS_TYPES, STATUSES } from 'constants/statuses'
import PollDetail from '../PollDetail'
import VoteBreakdown from '../VoteBreakdown'
import SlashingObjection from '../SlashingObjection'
import VotingItems from '../VotingItems'

function CardCollapsedContent ({ contract, proposalId, proposalsKind, proposalInfo }) {
  return (
        <>
            <div className="list-card__line" />
            <PollDetail pollDetail={proposalInfo} contract={proposalInfo.contract} proposalsKind={proposalsKind} />

            <div className="list-card__line" />
            <VoteBreakdown voteBreakdown={proposalInfo} />

            <VotingItems proposal={proposalInfo} />
            {proposalsKind === PROPOSALS_TYPES.slashingProposals && proposalInfo.status === STATUSES.executed
              ? (
                <>
                    <div className="list-card__line" />
                    <SlashingObjection
                        contract={contract}
                        proposal={proposalInfo}
                        proposalId={proposalId}
                        objData={proposalInfo.objEscrow}
                    />
                </>
                )
              : null}
        </>
  )
}

export default CardCollapsedContent
