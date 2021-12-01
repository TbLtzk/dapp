import React, { useEffect, useState } from 'react'

import PageWrap from 'components/Base/PageWrap'
import VotingStats from 'components/Custom/VotingStats'
import { CONTRACTS_NAMES } from 'constants/contracts'
import { PROPOSALS_TYPES, STATUSES } from 'constants/statuses'
import { getProposal } from 'contracts/helpers/voting-helpers/base-voting-helper'
import ListCard from '../Proposals/components/ProposalsList/components/ListCard'
import ProposalContent from '../Proposals/components/ProposalsList/components/ProposalContent'
import PollDetail from '../Proposals/components/ProposalsList/components/PollDetail/PollDetail'
import VoteBreakdown from '../Proposals/components/ProposalsList/components/VoteBreakdown/VoteBreakdown'
import VotingItems from '../Proposals/components/ProposalsList/components/VotingItems/VotingItems'
import SlashingObjection from '../Proposals/components/ProposalsList/components/SlashingObjection/SlashingObjection'
import { LoadingWrap } from 'constants/style'
import LoadingSpinner from 'components/Base/LoadingSpinner'
import { transactionCounter } from 'store/transaction-handler/selectors'
import { useSelector } from 'react-redux'

function OneProposalPage ({ match }) {
  const updateProposal = useSelector(transactionCounter) // add icon refresh???

  const [proposal, setProposal] = useState(null)
  const [error, setError] = useState(null)
  const proposalKind = checkActiveTabByContract(match.params.contract)

  useEffect(() => {
    if (proposalKind === 'error') {
      setError(true)
    } else if (!updateProposal) {
      handleGetProposal()
    }
  }, [updateProposal, proposalKind])

  async function handleGetProposal () {
    const data = await getProposal(match.params.contract, match.params.id)

    if (data?.error) {
      setError(true)
    } else {
      setProposal(data)
    }
  }

  function checkActiveTabByContract (contract) {
    switch (contract) {
      case CONTRACTS_NAMES.constitutionVoting:
      case CONTRACTS_NAMES.emergencyUpdateVoting:
      case CONTRACTS_NAMES.generalUpdateVoting: {
        return PROPOSALS_TYPES.proposals
      }
      case CONTRACTS_NAMES.rootsVoting: {
        return PROPOSALS_TYPES.rootNodePanel
      }
      case CONTRACTS_NAMES.ePQFIMembershipVoting:
      case CONTRACTS_NAMES.ePDRMembershipVoting:
      case CONTRACTS_NAMES.ePQFIParametersVoting:
      case CONTRACTS_NAMES.ePDRParametersVoting: {
        return PROPOSALS_TYPES.expertProposals
      }
      case CONTRACTS_NAMES.rootNodesSlashingVoting:
      case CONTRACTS_NAMES.validatorsSlashingVoting: {
        return PROPOSALS_TYPES.slashingProposals
      }
      default: {
        return 'error'
      }
    }
  }

  return (
        <PageWrap wrapContentClasses="wrap-content__column-2-1" headerTitle={proposalKind.replace(/-/g, ' ')}>
            {error
              ? (
                <p>Wrong link</p>
                )
              : !proposal
                  ? (
                <LoadingWrap>
                    <LoadingSpinner />
                </LoadingWrap>
                    )
                  : (
                <ListCard
                    id={proposal.id + proposal?.contract}
                    proposal={proposal}
                    oneProposalPage={true}
                    content={
                        <>
                            <ProposalContent proposal={proposal} />
                            <div className="list-card__line" />
                            <PollDetail pollDetail={proposal} proposalsKind={proposalKind} />
                            <div className="list-card__line" />
                            <VoteBreakdown voteBreakdown={proposal} />
                            <VotingItems proposal={proposal} />
                            {proposalKind === PROPOSALS_TYPES.slashingProposals &&
                            proposal.status === STATUSES.executed
                              ? (
                                <>
                                    <div className="list-card__line" />
                                    <SlashingObjection
                                        contract={proposal.contract}
                                        proposalId={proposal.id}
                                        objData={proposal.objEscrow}
                                    />
                                </>
                                )
                              : null}
                        </>
                    }
                />
                    )}
            <VotingStats />
        </PageWrap>
  )
}

export default OneProposalPage
