import React, { useEffect, useState } from 'react'

import PageWrap from 'components/Base/PageWrap'
import VotingStats from 'components/Custom/VotingStats'
import { CONTRACTS_NAMES } from 'constants/contracts'
import { PROPOSALS_TYPES } from 'constants/statuses'
import { getProposal } from 'contracts/helpers/voting-helpers/base-voting-helper'
import { transactionCounter } from 'store/transaction-handler/selectors'
import { useSelector } from 'react-redux'
import ProposalCard from './ProposalCard'
import SkeletonProposalsLoading from 'components/Base/SkeletonLoading'

function OneProposalPage ({ match }) {
  const updateProposal = useSelector(transactionCounter)

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
    const data = await getProposal(match.params.contract, match.params.id, true)
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
      case CONTRACTS_NAMES.ePDRParametersVoting:
      case CONTRACTS_NAMES.ePRSMembershipVoting:
      case CONTRACTS_NAMES.ePRSParametersVoting: {
        return PROPOSALS_TYPES.expertProposals
      }
      case CONTRACTS_NAMES.rootNodesSlashingVoting:
      case CONTRACTS_NAMES.validatorsSlashingVoting: {
        return PROPOSALS_TYPES.slashingProposals
      }
      case CONTRACTS_NAMES.upgradeVoting:
      case CONTRACTS_NAMES.addressVoting: {
        return PROPOSALS_TYPES.contractUpdates
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
                <SkeletonProposalsLoading />
                    )
                  : (
                <div>
                    <ProposalCard proposalKind={proposalKind} proposal={proposal} />
                </div>
                    )}
            <VotingStats />
        </PageWrap>
  )
}

export default OneProposalPage
