import React, { useEffect, useState } from 'react'
import { PROPOSALS_TYPES, STATUSES } from 'constants/statuses'
import PollDetail from '../PollDetail'
import VoteBreakdown from '../VoteBreakdown'
import SlashingObjection from '../SlashingObjection'
import VotingItems from '../VotingItems'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingWrap } from 'constants/style'
import LoadingSpinner from 'components/Base/LoadingSpinner'
import { getProposal, setProposal } from 'store/voting/proposals/action-creators'
import { proposalSelector } from 'store/voting/proposals/selectors'

function CardCollapsedContent ({ contract, proposalId, handleVote, handleExecute, proposalsKind, proposalStatus }) {
  const dispatch = useDispatch()
  const proposal = useSelector(proposalSelector)

  const [proposalInfo, setProposalInfo] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(getProposal(contract, proposalId))
  }, [])

  useEffect(() => {
    if (proposal && loading) {
      setLoading(false)
      setProposalInfo(proposal)
      dispatch(setProposal(null))
    }
  }, [proposal])

  return (
        <>
            {loading
              ? (
                <LoadingWrap>
                    <LoadingSpinner />
                </LoadingWrap>
                )
              : (
                <>
                    <div className="list-card__line" />
                    <PollDetail pollDetail={proposalInfo} proposalsKind={proposalsKind} />
                    <div className="list-card__line" />
                    <VoteBreakdown voteBreakdown={proposalInfo} />
                    <VotingItems
                        proposalStatus={proposalStatus}
                        contract={contract}
                        status={proposalInfo.status}
                        handleVote={handleVote}
                        handleExecute={handleExecute}
                    />
                    {proposalsKind === PROPOSALS_TYPES.slashingProposals && proposalStatus === STATUSES.executed
                      ? (
                        <>
                            <div className="list-card__line" />
                            <SlashingObjection
                                contract={contract}
                                proposalId={proposalId}
                                objData={proposalInfo.objEscrow}
                            />
                        </>
                        )
                      : null}
                </>
                )}
        </>
  )
}

export default CardCollapsedContent
