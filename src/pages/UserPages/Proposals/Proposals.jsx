import React from 'react'
import PageWrap from 'components/Base/PageWrap'
import BigTabsView from 'components/Base/Tabs/BigTabsView'
import ProposalsTab from './components/ProposalsTab'
import CreateQProposalBtn from './components/CreateQProposalBtn'

import { PROPOSALS_TYPES, PROPOSAL_STATUS_TYPES } from 'constants/statuses'
import { useSelector } from 'react-redux'
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

function Proposals ({ proposalsType }) {
  const { proposals, endedProposals, activeProposalsCount, endedProposalsCount } =
        getProposalsSelector(proposalsType)

  const name = getPageName(proposalsType)

  function getPageName (type) {
    switch (type) {
      case PROPOSALS_TYPES.proposals:
        return 'Q Proposals'
      case PROPOSALS_TYPES.rootNodePanel:
        return 'Root Node Panel'
      case PROPOSALS_TYPES.expertProposals:
        return 'Expert Proposals'
      case PROPOSALS_TYPES.slashingProposals:
      default:
        return 'Slashing Proposals'
    }
  }

  function getProposalsSelector (type) {
    switch (type) {
      case PROPOSALS_TYPES.proposals:
        return {
          proposals: useSelector(qActiveProposalsSelector),
          endedProposals: useSelector(qEndedProposalsSelector),
          activeProposalsCount: useSelector(qActiveProposalsCountSelector),
          endedProposalsCount: useSelector(qEndedProposalsCountSelector)
        }
      case PROPOSALS_TYPES.rootNodePanel:
        return {
          proposals: useSelector(rootActiveProposalsSelector),
          endedProposals: useSelector(rootEndedProposalsSelector),
          activeProposalsCount: useSelector(rootActiveProposalsCountSelector),
          endedProposalsCount: useSelector(rootEndedProposalsCountSelector)
        }
      case PROPOSALS_TYPES.expertProposals:
        return {
          proposals: useSelector(expertActiveProposalsSelector),
          endedProposals: useSelector(expertEndedProposalsSelector),
          activeProposalsCount: useSelector(expertActiveProposalsCountSelector),
          endedProposalsCount: useSelector(expertEndedProposalsCountSelector)
        }
      case PROPOSALS_TYPES.slashingProposals:
        return {
          proposals: useSelector(slashingActiveProposalsSelector),
          endedProposals: useSelector(slashingEndedProposalsSelector),
          activeProposalsCount: useSelector(slashingActiveProposalsCountSelector),
          endedProposalsCount: useSelector(slashingEndedProposalsCountSelector)
        }
    }
  }

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

  return (
        <PageWrap headerTitle={name} headerExtra={<CreateQProposalBtn activeTab={proposalsType} />}>
            <BigTabsView tabsItems={tabsItems} active={tabsItems[0]?.label} />
        </PageWrap>
  )
}

export default Proposals
