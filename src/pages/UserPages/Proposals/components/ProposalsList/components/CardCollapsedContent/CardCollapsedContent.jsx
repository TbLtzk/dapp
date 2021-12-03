import React, { useEffect, useState } from 'react'
import { PROPOSALS_TYPES, STATUSES } from 'constants/statuses'
import PollDetail from '../PollDetail'
import VoteBreakdown from '../VoteBreakdown'
import SlashingObjection from '../SlashingObjection'
import VotingItems from '../VotingItems'
import { LoadingWrap } from 'constants/style'
import LoadingSpinner from 'components/Base/LoadingSpinner'
import { getProposal } from 'contracts/helpers/voting-helpers/base-voting-helper'
import { useDispatch } from 'react-redux'
import { setVoteProposalObj } from 'store/voting/proposals/action-creators'

function CardCollapsedContent ({ contract, proposalId, proposalsKind, proposalStatus, reloadProposal }) {
  const dispatch = useDispatch()
  const [proposalInfo, setProposalInfo] = useState(null)

  useEffect(() => {
    handleGetProposal()
  }, [])

  useEffect(() => {
    if (reloadProposal) {
      handleGetProposal()
      dispatch(setVoteProposalObj({}))
    }
  }, [reloadProposal])

  async function handleGetProposal () {
    const result = await getProposal(contract, proposalId, 'full')
    setProposalInfo(result)
  }

  return (
        <>
            {!proposalInfo
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
                    <div className="list-card__line" />
                    <VotingItems proposal={proposalInfo} />
                    {proposalsKind === PROPOSALS_TYPES.slashingProposals && proposalStatus === STATUSES.executed
                      ? (
                        <>
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
                )}
        </>
  )
}

export default CardCollapsedContent
