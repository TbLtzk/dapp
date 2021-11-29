import React from 'react'
import VotingStats from 'components/Custom/VotingStats'
import ProposalsLazyLoading from '../ProposalsLazyLoading'
import { ProposalsTabWrp } from './styles'

function ProposalsTab ({ proposalsType, isLoading, proposals, errorMessage, proposalsCount, proposalStatus }) {
  return (
        <ProposalsTabWrp>
            <ProposalsLazyLoading
                activeTab={proposalsType}
                proposals={proposals}
                loading={isLoading}
                errorMessage={errorMessage}
                proposalsKind={proposalsType}
                proposalsCount={proposalsCount}
                proposalStatus={proposalStatus}
            />
            <VotingStats />
        </ProposalsTabWrp>
  )
}

export default ProposalsTab
