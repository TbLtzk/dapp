import React from 'react'
import VotingStats from 'components/Custom/VotingStats'
import ProposalsPagination from '../ProposalsPagination'
import { ProposalsTabWrp } from './styles'

function ProposalsTab (props) {
  const {
    proposalsType,
    isLoading,
    proposals,
    errorMessage,
    proposalsCount
  } = props

  return (
    <ProposalsTabWrp>
      <ProposalsPagination
        activeTab={proposalsType}
        proposals={proposals}
        loading={isLoading}
        errorMessage={errorMessage}
        proposalsKind={proposalsType}
        proposalsCount={proposalsCount}
      />
      <VotingStats/>
      </ProposalsTabWrp>
  )
}

export default ProposalsTab
