import React from 'react'
import VotingStats from 'components/Custom/VotingStats'
import ProposalsList from '../ProposalsList'
import { ProposalsTabWrp } from './styles'

function ProposalsTab ({ proposalsType, proposals, proposalsCount, proposalStatus }) {
  return (
        <ProposalsTabWrp>
            <ProposalsList
                activeTab={proposalsType}
                proposals={proposals}
                proposalsKind={proposalsType}
                proposalsCount={proposalsCount}
                proposalStatus={proposalStatus}
            />
            <VotingStats />
        </ProposalsTabWrp>
  )
}

export default ProposalsTab
