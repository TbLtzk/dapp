import React from 'react'
import { PROPOSALS_TYPES, STATUSES } from 'constants/statuses'
import PollDetail from '../PollDetail'
import VoteBreakdown from '../VoteBreakdown'
import SlashingObjection from '../SlashingObjection'
import Button from 'components/Base/Buttons/Button'

function CustomButtons ({ status, handleVote, handleExecute }) {
  return (
        <>
            {status === 'Passed' ? <Button onClick={handleExecute} title="Execute" /> : null}
            {status === 'Pending' || status === 'Accepted'
              ? (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        icon="checkbox-marked-outline"
                        width="75px"
                        margin="0 20px 0 0"
                        title="Vote"
                        disabled={status === 'Accepted'}
                        handleButton={handleVote}
                    />
                    <Button
                        icon="window-close"
                        width="75px"
                        title="Veto"
                        disabled={status === 'Pending'}
                        handleButton={handleVote}
                    />
                </div>
                )
              : null}
        </>
  )
}

function CardCollapsedContent ({
  proposal,
  voteBreakdown,
  proposalsKind,
  contract,
  proposalID,
  status,
  handleVote,
  handleExecute
}) {
  return (
        <>
            <div className="list-card__line" />
            <PollDetail pollDetail={proposal} proposalsKind={proposalsKind} />
            <div className="list-card__line" />
            <VoteBreakdown voteBreakdown={voteBreakdown} />
            <div className="list-card__line" />
            <CustomButtons status={status} handleVote={handleVote} handleExecute={handleExecute} />
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
