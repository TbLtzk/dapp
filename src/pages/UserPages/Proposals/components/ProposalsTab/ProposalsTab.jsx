import React from 'react'
import VotingStats from 'components/Custom/VotingStats'
import ProposalsLazyLoading from '../ProposalsLazyLoading'
import { ProposalsTabWrp } from './styles'

function ProposalsTab (props) {
  const {
    proposalsType,
    isLoading,
    proposals,
    errorMessage,
    proposalsCount,
    types
  } = props

  return (
    <ProposalsTabWrp>
      <ProposalsLazyLoading
        activeTab={proposalsType}
        proposals={proposals}
        loading={isLoading}
        errorMessage={errorMessage}
        proposalsKind={proposalsType}
        proposalsCount={proposalsCount}
        types={types}
      />
      <VotingStats/>
      </ProposalsTabWrp>
  )
}

export default ProposalsTab
