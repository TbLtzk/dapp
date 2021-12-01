import React, { useEffect, useState } from 'react'
import { PROPOSALS_TYPES, STATUSES } from 'constants/statuses'
import PollDetail from '../PollDetail'
import VoteBreakdown from '../VoteBreakdown'
import SlashingObjection from '../SlashingObjection'
import VotingItems from '../VotingItems'
import { LoadingWrap } from 'constants/style'
import LoadingSpinner from 'components/Base/LoadingSpinner'
import { getProposal } from 'contracts/helpers/voting-helpers/base-voting-helper'
// import { useSelector } from 'react-redux'
// import { transactionCounter } from 'store/transaction-handler/selectors'

function CardCollapsedContent ({ contract, proposalId, proposalsKind, proposalStatus }) {
  const [proposalInfo, setProposalInfo] = useState(null)

  useEffect(() => {
    handleGetProposal()
    return () => setProposalInfo(null)
  }, [])

  async function handleGetProposal () {
    const result = await getProposal(contract, proposalId)
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
                    <VotingItems proposal={proposalInfo} />
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
