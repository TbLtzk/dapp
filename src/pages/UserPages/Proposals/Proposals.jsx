import React, { useEffect } from 'react'
import PageWrap from 'components/Base/PageWrap'
import BigTabsView from 'components/Base/Tabs/BigTabsView'
import CreateQProposalBtn from './components/CreateQProposalBtn'
import VotingStats from 'components/Custom/VotingStats'

import { PROPOSALS_TYPES } from 'constants/statuses'
import { useDispatch, useSelector } from 'react-redux'
import {
  qActiveProposalsCountSelector,
  qActiveProposalsSelector,
  qEndedProposalsCountSelector,
  qEndedProposalsSelector
} from 'store/voting/q-proposals/selectors'
import {
  rootActiveProposalsCountSelector,
  rootActiveProposalsSelector,
  rootEndedProposalsCountSelector,
  rootEndedProposalsSelector
} from 'store/voting/root-node-proposals/selectors'
import {
  expertActiveProposalsCountSelector,
  expertActiveProposalsSelector,
  expertEndedProposalsCountSelector,
  expertEndedProposalsSelector
} from 'store/voting/expert-proposals/selectors'
import {
  slashingActiveProposalsCountSelector,
  slashingActiveProposalsSelector,
  slashingEndedProposalsCountSelector,
  slashingEndedProposalsSelector
} from 'store/voting/slashing-proposals/selectors'
import { getProposalsByType } from 'store/voting/proposals/action-creators'
import { CONTRACTS_NAMES } from 'constants/contracts'
import {
  contractUpdatesActiveProposalsCountSelector,
  contractUpdatesActiveProposalsSelector,
  contractUpdatesEndedProposalsCountSelector,
  contractUpdatesEndedProposalsSelector
} from 'store/voting/contract-updates/selectors'
import { ProposalsTabWrp } from './styles'
import ProposalsList from './components/ProposalsList/ProposalsList'

function Proposals ({ proposalsType }) {
  const {
    proposalsSelector,
    endedProposalsSelector,
    activeProposalsCountSelector,
    endedProposalsCountSelector,
    oneContractName,
    title
  } = getProposalsData(proposalsType)

  const dispatch = useDispatch()
  const proposals = useSelector(proposalsSelector)
  const endedProposals = useSelector(endedProposalsSelector)
  const activeProposalsCount = useSelector(activeProposalsCountSelector)
  const endedProposalsCount = useSelector(endedProposalsCountSelector)

  function getProposalsData (type) {
    switch (type) {
      case PROPOSALS_TYPES.proposals:
        return {
          title: 'Q Proposals',
          oneContractName: CONTRACTS_NAMES.constitutionVoting,
          proposalsSelector: qActiveProposalsSelector,
          endedProposalsSelector: qEndedProposalsSelector,
          activeProposalsCountSelector: qActiveProposalsCountSelector,
          endedProposalsCountSelector: qEndedProposalsCountSelector
        }
      case PROPOSALS_TYPES.rootNodePanel:
        return {
          title: 'Root Node Panel',
          oneContractName: CONTRACTS_NAMES.rootsVoting,
          proposalsSelector: rootActiveProposalsSelector,
          endedProposalsSelector: rootEndedProposalsSelector,
          activeProposalsCountSelector: rootActiveProposalsCountSelector,
          endedProposalsCountSelector: rootEndedProposalsCountSelector
        }
      case PROPOSALS_TYPES.expertProposals:
        return {
          title: 'Expert Proposals',
          oneContractName: CONTRACTS_NAMES.ePQFIMembershipVoting,
          proposalsSelector: expertActiveProposalsSelector,
          endedProposalsSelector: expertEndedProposalsSelector,
          activeProposalsCountSelector: expertActiveProposalsCountSelector,
          endedProposalsCountSelector: expertEndedProposalsCountSelector
        }
      case PROPOSALS_TYPES.slashingProposals:
        return {
          title: 'Slashing Proposals',
          oneContractName: CONTRACTS_NAMES.rootNodesSlashingVoting,
          proposalsSelector: slashingActiveProposalsSelector,
          endedProposalsSelector: slashingEndedProposalsSelector,
          activeProposalsCountSelector: slashingActiveProposalsCountSelector,
          endedProposalsCountSelector: slashingEndedProposalsCountSelector
        }
      case PROPOSALS_TYPES.contractUpdates:
        return {
          title: 'Contract Updates',
          oneContractName: CONTRACTS_NAMES.upgradeVoting,
          proposalsSelector: contractUpdatesActiveProposalsSelector,
          endedProposalsSelector: contractUpdatesEndedProposalsSelector,
          activeProposalsCountSelector: contractUpdatesActiveProposalsCountSelector,
          endedProposalsCountSelector: contractUpdatesEndedProposalsCountSelector
        }
    }
  }

  useEffect(() => {
    dispatch(getProposalsByType(oneContractName))
  }, [dispatch, proposalsType])

  const tabsItems = [
    {
      label: 'active-proposals',
      title: 'Active Proposals',
      content: (
                <ProposalsTabWrp>
                    <ProposalsList
                        proposals={proposals}
                        proposalsKind={proposalsType}
                        proposalsCount={activeProposalsCount}
                    />
                    <VotingStats />
                </ProposalsTabWrp>
      )
    },
    {
      label: 'ended-proposals',
      title: 'Ended Proposals',
      content: (
                <ProposalsTabWrp>
                    <ProposalsList
                        proposals={endedProposals}
                        proposalsKind={proposalsType}
                        proposalsCount={endedProposalsCount}
                    />
                    <VotingStats />
                </ProposalsTabWrp>
      )
    }
  ]

  const createProposal =
        proposalsType !== PROPOSALS_TYPES.contractUpdates ? <CreateQProposalBtn activeTab={proposalsType} /> : null

  return (
        <PageWrap headerTitle={title} headerExtra={createProposal}>
            <BigTabsView tabsItems={tabsItems} active={tabsItems[0]?.label} />
        </PageWrap>
  )
}

export default Proposals
