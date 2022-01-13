import React, { useEffect } from 'react'
import PageWrap from 'components/Base/PageWrap'
import BigTabsView from 'components/Base/Tabs/BigTabsView'
import ProposalsTab from './components/ProposalsTab'
import CreateQProposalBtn from './components/CreateQProposalBtn'

import { PROPOSALS_TYPES, PROPOSAL_STATUS_TYPES } from 'constants/statuses'
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

function Proposals ({ proposalsType }) {
  const { proposals, endedProposals, activeProposalsCount, endedProposalsCount, oneContractName, title } =
        getProposalsData(proposalsType)

  const dispatch = useDispatch()

  function getProposalsData (type) {
    switch (type) {
      case PROPOSALS_TYPES.proposals:
        return {
          title: 'Q Proposals',
          oneContractName: CONTRACTS_NAMES.constitutionVoting,
          proposals: useSelector(qActiveProposalsSelector),
          endedProposals: useSelector(qEndedProposalsSelector),
          activeProposalsCount: useSelector(qActiveProposalsCountSelector),
          endedProposalsCount: useSelector(qEndedProposalsCountSelector)
        }
      case PROPOSALS_TYPES.rootNodePanel:
        return {
          title: 'Root Node Panel',
          oneContractName: CONTRACTS_NAMES.rootsVoting,
          proposals: useSelector(rootActiveProposalsSelector),
          endedProposals: useSelector(rootEndedProposalsSelector),
          activeProposalsCount: useSelector(rootActiveProposalsCountSelector),
          endedProposalsCount: useSelector(rootEndedProposalsCountSelector)
        }
      case PROPOSALS_TYPES.expertProposals:
        return {
          title: 'Expert Proposals',
          oneContractName: CONTRACTS_NAMES.ePQFIMembershipVoting,
          proposals: useSelector(expertActiveProposalsSelector),
          endedProposals: useSelector(expertEndedProposalsSelector),
          activeProposalsCount: useSelector(expertActiveProposalsCountSelector),
          endedProposalsCount: useSelector(expertEndedProposalsCountSelector)
        }
      case PROPOSALS_TYPES.slashingProposals:
        return {
          title: 'Slashing Proposals',
          oneContractName: CONTRACTS_NAMES.rootNodesSlashingVoting,
          proposals: useSelector(slashingActiveProposalsSelector),
          endedProposals: useSelector(slashingEndedProposalsSelector),
          activeProposalsCount: useSelector(slashingActiveProposalsCountSelector),
          endedProposalsCount: useSelector(slashingEndedProposalsCountSelector)
        }
      case PROPOSALS_TYPES.contractUpdates:
        return {
          title: 'Contract Updates',
          oneContractName: CONTRACTS_NAMES.contractRegistryAddressVoting,
          proposals: useSelector(contractUpdatesActiveProposalsSelector),
          endedProposals: useSelector(contractUpdatesEndedProposalsSelector),
          activeProposalsCount: useSelector(contractUpdatesActiveProposalsCountSelector),
          endedProposalsCount: useSelector(contractUpdatesEndedProposalsCountSelector)
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
                <ProposalsTab
                    proposals={proposals}
                    proposalsType={proposalsType}
                    proposalsCount={activeProposalsCount}
                    proposalStatus={PROPOSAL_STATUS_TYPES.active}
                />
      )
    },
    {
      label: 'ended-proposals',
      title: 'Ended Proposals',
      content: (
                <ProposalsTab
                    proposals={endedProposals}
                    proposalsType={proposalsType}
                    proposalsCount={endedProposalsCount}
                    proposalStatus={PROPOSAL_STATUS_TYPES.ended}
                />
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
